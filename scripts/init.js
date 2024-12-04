#!/usr/bin/env node

const { program } = require('commander');
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const chalk = require('chalk');
const { log } = console;

const url = 'https://github.com/haydenbleasel/next-forge';

program
  .command('init <name>')
  .description('Initialize a new Next Forge project')
  .action((projectName) => {
    try {
      log(chalk.green('Creating new Next Forge project...'));

      execSync(
        `pnpm create next-app@latest ${projectName} --example "${url}"`,
        {
          stdio: 'inherit',
        }
      );

      log(chalk.green('Setting up next-forge...'));
      const cwd = process.cwd();
      const projectDir = path.join(cwd, projectName);

      process.chdir(projectDir);
      log(chalk.green('Installing dependencies...'));
      execSync('pnpm install', { stdio: 'inherit' });

      log(chalk.green('Copying .env.example files to .env.local...'));

      for (const app of ['api', 'app', 'web']) {
        fs.copyFileSync(`apps/${app}/.env.example`, `apps/${app}/.env.local`);
      }

      fs.copyFileSync(
        'packages/database/.env.example',
        'packages/database/.env'
      );

      fs.copyFileSync('packages/cms/.env.example', 'packages/cms/.env.local');

      log(chalk.green('Deleting internal content...'));
      for (const dir of ['.github/workflows', 'docs', 'splash']) {
        fs.rmSync(dir, { recursive: true, force: true });
      }

      for (const file of [
        '.github/CONTRIBUTING.md',
        '.github/FUNDING.yml',
        '.github/SECURITY.md',
        '.autorc',
        'CHANGELOG.md',
        'license.md',
      ]) {
        fs.unlinkSync(file);
      }

      log(chalk.green('Setting up Prisma...'));
      execSync('pnpm build --filter @repo/database', { stdio: 'inherit' });

      log(chalk.green('Setup complete! Deleting scripts folder...'));
      fs.rmSync('scripts', { recursive: true, force: true });
    } catch (error) {
      log(chalk.red('Failed to initialize project:', error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);
