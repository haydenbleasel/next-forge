#!/usr/bin/env node

const { execSync } = require('child_process');

const args = process.argv.slice(2);

if (args[0] === 'init') {
  try {
    // Clone the repo
    execSync(
      'pnpm create next-app --example https://github.com/haydenbleasel/next-forge',
      { stdio: 'inherit' }
    );

    // Get the project name from the last part of the repo URL
    const projectName = 'next-forge';

    // Move into the project directory and run setup script
    execSync(`cd ${projectName} && ./setup.sh`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to initialize project:', error.message);
    process.exit(1);
  }
} else {
  console.log('Usage: npx next-forge init');
}
