#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { copyFileSync, rmSync, unlinkSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import chalk from 'chalk';
import { program } from 'commander';
const { log } = console;

const url = 'https://github.com/haydenbleasel/next-forge';

program
  .command('init <name>')
  .description('Initialize a new next-forge project')
  .action((projectName) => {
    try {
      log(chalk.green('Creating new next-forge project...'));

      execSync(
        `pnpm create next-app@latest ${projectName} --example "${url}"`,
        {
          stdio: 'inherit',
        }
      );

      log(chalk.green('Setting up next-forge...'));
      const cwd = process.cwd();
      const projectDir = join(cwd, projectName);

      process.chdir(projectDir);
      log(chalk.green('Installing dependencies...'));
      execSync('pnpm install', { stdio: 'inherit' });

      log(chalk.green('Copying .env.example files to .env.local...'));

      for (const app of ['api', 'app', 'web']) {
        copyFileSync(`apps/${app}/.env.example`, `apps/${app}/.env.local`);
      }

      copyFileSync('packages/database/.env.example', 'packages/database/.env');

      fs.copyFileSync('packages/cms/.env.example', 'packages/cms/.env.local');

      log(chalk.green('Deleting internal content...'));
      for (const dir of ['.github/workflows', 'docs', 'splash']) {
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
        unlinkSync(file);
      }

      log(chalk.green('Setting up Prisma...'));
      execSync('pnpm build --filter @repo/database', { stdio: 'inherit' });

      log(chalk.green('Setup complete! Deleting scripts folder...'));
      rmSync('scripts', { recursive: true, force: true });

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
  .argument('<fromVersion>', 'Version to update from')
  .argument('<toVersion>', 'Version to update to')
  .action(async (fromVersion, toVersion) => {
    try {
      log(
        chalk.green(
          `Preparing to update from ${fromVersion} to ${toVersion}...`
        )
      );

      // Ensure git is available
      try {
        execSync('git --version', { stdio: 'ignore' });
      } catch {
        log(chalk.red('Git is required for updating. Please install git.'));
        process.exit(1);
      }

      // Create a temporary directory for downloading source
      const tempDir = join(import.meta.dirname, 'next-forge-update');

      // Create a temporary directory for downloading source
      await mkdir(tempDir);

      log(chalk.blue('Cloning repository...'));
      execSync(`git clone ${url} ${tempDir}`, { stdio: 'inherit' });

      process.chdir(tempDir);

      log(
        chalk.blue(`Checking out versions ${fromVersion} and ${toVersion}...`)
      );
      execSync(`git checkout ${fromVersion}`, { stdio: 'inherit' });
      const fromFiles = execSync('git ls-files').toString().trim().split('\n');

      execSync(`git checkout ${toVersion}`, { stdio: 'inherit' });
      const toFiles = execSync('git ls-files').toString().trim().split('\n');

      // Compute diff between versions
      const filesToUpdate = toFiles.filter(
        (file) =>
          !fromFiles.includes(file) ||
          execSync(`git diff ${fromVersion} ${toVersion} -- ${file}`)
            .toString()
            .trim() !== ''
      );

      log(chalk.green(`Found ${filesToUpdate.length} files to update`));

      // Return to original project directory
      process.chdir(import.meta.dirname);

      // Apply updates
      for (const file of filesToUpdate) {
        const sourcePath = join(tempDir, file);
        const destPath = join(import.meta.dirname, file);

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

      log(
        chalk.green(
          `Successfully updated project from ${fromVersion} to ${toVersion}!`
        )
      );

      log(chalk.yellow('Note: Please review and test the changes carefully.'));
    } catch (error) {
      log(chalk.red('Failed to update project:', error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);
