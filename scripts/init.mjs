#!/usr/bin/env node

import { execSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import chalk from 'chalk';
import { program } from 'commander';
const { log } = console;

const url = 'https://github.com/haydenbleasel/next-forge';

// Escapes special characters in filenames that would cause issues in bash commands
// Adds backslash before: () [] {} ^ $ * + ? . | and \
const cleanFileName = (file) => file.replace(/([()[\]{}^$*+?.|\\])/g, '\\$1');

const execSyncOpts = { stdio: 'ignore' };

const internalContentDirs = ['.github/workflows', 'docs', 'splash'];
const internalContentFiles = [
  '.github/CONTRIBUTING.md',
  '.github/FUNDING.yml',
  '.github/SECURITY.md',
  '.autorc',
  'CHANGELOG.md',
  'license.md',
];
const allInternalContent = [...internalContentDirs, ...internalContentFiles];

program
  .command('init <name>')
  .description('Initialize a new next-forge project')
  .option(
    '--package-manager <manager>',
    'Package manager to use (npm, yarn, bun, pnpm)',
    'pnpm'
  )
  .action((projectName, options) => {
    try {
      const cwd = process.cwd();
      const projectDir = join(cwd, projectName);
      const { packageManager } = options;

      log(chalk.green('Creating new next-forge project...'));
      execSync(
        `${packageManager} create next-app@latest ${projectName} --example "${url}" --disable-git`,
        execSyncOpts
      );
      process.chdir(projectDir);

      if (packageManager === 'bun') {
        log(chalk.green('Configuring Bun workspaces...'));
        const packageJsonPath = join(projectDir, 'package.json');
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

        packageJson.workspaces = ['apps/*', 'packages/*'];
        packageJson.packageManager = 'bun@1.1.38';

        writeFileSync(
          packageJsonPath,
          `${JSON.stringify(packageJson, null, 2)}\n`
        );
      }

      log(chalk.green('Deleting internal content...'));
      for (const dir of ['.github/workflows', 'docs', 'splash', 'scripts']) {
        rmSync(dir, { recursive: true, force: true });
      }
      for (const file of [
        '.github/CONTRIBUTING.md',
        '.github/FUNDING.yml',
        '.github/SECURITY.md',
        '.autorc',
        'CHANGELOG.md',
        'license.md',
      ]) {
        if (existsSync(file)) {
          unlinkSync(file);
        }
      }

      if (packageManager !== 'pnpm') {
        log(chalk.green('Removing pnpm lockfile and workspace config...'));
        rmSync('pnpm-lock.yaml', { force: true });
        rmSync('pnpm-workspace.yaml', { force: true });
      }

      log(chalk.green('Installing dependencies...'));
      execSync(`${packageManager} install`, execSyncOpts);

      log(chalk.green('Re-initializing git repository after install...'));
      execSync('git init', execSyncOpts);
      execSync('git add .', execSyncOpts);
      execSync('git commit -m "✨ Initial commit"', execSyncOpts);

      log(chalk.green('Copying .env.example files to .env.local...'));

      for (const path of ['apps/api', 'apps/app', 'apps/web', 'packages/cms']) {
        copyFileSync(`${path}/.env.example`, `${path}/.env.local`);
      }
      copyFileSync('packages/database/.env.example', 'packages/database/.env');

      log(chalk.green('Setting up Prisma...'));
      execSync(
        `${packageManager} run build --filter @repo/database`,
        execSyncOpts
      );

      log(chalk.green('Done!'));
      log(
        chalk.yellow(
          'Please make sure you install the Mintlify CLI and Stripe CLI before starting the project.'
        )
      );
    } catch (error) {
      log(chalk.red('Failed to initialize project:', error.message));
      process.exit(1);
    }
  });

program
  .command('update')
  .description('Update the project from one version to another')
  .option('--from <version>', 'Version to update from')
  .option('--to <version>', 'Version to update to')
  .action(async (options) => {
    const cwd = process.cwd();
    const tempDir = join(cwd, 'next-forge-update');

    try {
      const from = options.from.startsWith('v')
        ? options.from
        : `v${options.from}`;
      const to = options.to.startsWith('v') ? options.to : `v${options.to}`;

      log(chalk.green(`Preparing to update from ${from} to ${to}...`));

      // Ensure git is available
      execSync('git --version', execSyncOpts);

      log(chalk.blue('Creating temporary directory...'));
      rmSync(tempDir, { recursive: true, force: true });
      await mkdir(tempDir);

      log(chalk.blue('Cloning next-forge...'));
      execSync(`git clone ${url} ${tempDir}`, execSyncOpts);
      process.chdir(tempDir);

      log(chalk.blue(`Checking out version ${from}...`));
      execSync(`git checkout ${from}`, execSyncOpts);
      const fromFiles = execSync('git ls-files').toString().trim().split('\n');

      log(chalk.blue(`Checking out version ${to}...`));
      execSync(`git checkout ${to}`, execSyncOpts);
      const toFiles = execSync('git ls-files').toString().trim().split('\n');

      log(chalk.blue('Computing diff between versions...'));
      const filesToUpdate = toFiles.filter((file) => {
        if (allInternalContent.some((ic) => file.startsWith(ic))) {
          // Skip internal content that is meant to be deleted during init
          return false;
        }

        const hasChanged =
          !fromFiles.includes(file) ||
          execSync(`git diff ${from} ${to} -- ${cleanFileName(file)}`)
            .toString()
            .trim() !== '';

        return hasChanged;
      });

      log(
        chalk.green(
          `Found ${filesToUpdate.length} files to update, applying updates...`
        )
      );

      process.chdir(cwd);

      for (const file of filesToUpdate) {
        const sourcePath = join(tempDir, file);
        const destPath = join(cwd, file);

        // Ensure destination directory exists
        await mkdir(dirname(destPath), { recursive: true });

        // Copy file if it doesn't exist, or overwrite if it's different
        if (
          !existsSync(destPath) ||
          readFileSync(sourcePath).toString() !==
            readFileSync(destPath).toString()
        ) {
          log(chalk.blue(`Updating ${file}...`));
          copyFileSync(sourcePath, destPath);
        }
      }

      log(chalk.blue('Cleaning up...'));
      rmSync(tempDir, { recursive: true, force: true });

      log(chalk.green(`Successfully updated project from ${from} to ${to}!`));
      log(chalk.yellow('Note: Please review and test the changes carefully.'));
    } catch (error) {
      log(chalk.red('Failed to update project:', error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);
