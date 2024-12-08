#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const url = 'https://github.com/haydenbleasel/next-forge';

if (args.length !== 2 || args[0] !== 'init' || !args[1].trim()) {
  console.log('Usage: npx next-forge init [name]');
  process.exit(1);
}

try {
  const projectName = args[1];

  execSync(`pnpm create next-app@latest ${projectName} --example "${url}"`, {
    stdio: 'inherit',
  });

  console.log('Setting up next-forge...');
  const cwd = process.cwd();
  const projectDir = path.join(cwd, projectName);

  process.chdir(projectDir);
  console.log('Installing dependencies...');
  execSync('pnpm install', { stdio: 'inherit' });

  console.log('Copying .env.example files to .env.local...');

  for (const app of ['api', 'app', 'web']) {
    fs.copyFileSync(`apps/${app}/.env.example`, `apps/${app}/.env.local`);
  }

  fs.copyFileSync('packages/database/.env.example', 'packages/database/.env');
  fs.copyFileSync('packages/cms/.env.example', 'packages/cms/.env.local');

  console.log('Deleting internal content...');
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

  console.log('Setting up Prisma...');
  execSync('pnpm build --filter @repo/database', { stdio: 'inherit' });

  console.log('Setup complete! Deleting scripts folder...');
  fs.rmSync('scripts', { recursive: true, force: true });
} catch (error) {
  console.error('Failed to initialize project:', error.message);
  process.exit(1);
}
