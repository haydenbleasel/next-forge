#!/usr/bin/env node

const { execSync } = require('child_process');

const args = process.argv.slice(2);
const opts = { stdio: 'inherit' };
const url = 'https://github.com/haydenbleasel/next-forge';

if (args.length !== 2 || args[0] !== 'init' || !args[1].trim()) {
  console.log('Usage: npx next-forge init [name]');
  process.exit(1);
}

try {
  const projectName = args[1];

  execSync(`pnpm create next-app ${projectName} --example ${url}`, opts);
  execSync(`cd ${projectName} && ./setup.sh`, opts);
} catch (error) {
  console.error('Failed to initialize project:', error.message);
  process.exit(1);
}
