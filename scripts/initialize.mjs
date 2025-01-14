import { execSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import chalk from 'chalk';

const { log } = console;
const execSyncOpts = { stdio: 'ignore' };
const url = 'https://github.com/haydenbleasel/next-forge';
const runCommand = {
  pnpm: 'pnpm create next-app@latest',
  npm: 'npx create-next-app@latest',
  yarn: 'yarn create next-app@latest',
  bun: 'bun create next-app@latest',
};

/**
 * @param {string} projectName
 * @param {Object} options
 * @param {string} options.packageManager
 */
export const initialize = (projectName, options) => {
  try {
    const cwd = process.cwd();
    const projectDir = join(cwd, projectName);
    const { packageManager } = options;

    log(chalk.green('Creating new next-forge project...'));
    execSync(
      `${runCommand[packageManager]} ${projectName} --example "${url}" --disable-git`,
      execSyncOpts
    );
    process.chdir(projectDir);

    if (packageManager !== 'pnpm') {
      const packageJsonPath = join(projectDir, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

      log(chalk.green('Updating package manager configuration...'));

      if (packageManager === 'bun') {
        packageJson.packageManager = 'bun@1.1.43';
      } else if (packageManager === 'npm') {
        packageJson.packageManager = 'npm@10.8.1';
      } else if (packageManager === 'yarn') {
        packageJson.packageManager = 'yarn@4.6.0';
      }

      log(chalk.green('Updating workspace config...'));
      packageJson.workspaces = ['apps/*', 'packages/*'];

      writeFileSync(
        packageJsonPath,
        `${JSON.stringify(packageJson, null, 2)}\n`
      );

      log(chalk.green('Removing pnpm configuration...'));
      rmSync('pnpm-lock.yaml', { force: true });
      rmSync('pnpm-workspace.yaml', { force: true });

      log(chalk.green('Updating workspace dependencies...'));
      const workspaceDirs = ['apps', 'packages'];
      for (const dir of workspaceDirs) {
        const packages = readdirSync(join(projectDir, dir));
        for (const pkg of packages) {
          const pkgJsonPath = join(projectDir, dir, pkg, 'package.json');

          if (!existsSync(pkgJsonPath)) {
            continue;
          }

          const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));

          // Update dependencies
          if (pkgJson.dependencies) {
            for (const [dep, version] of Object.entries(pkgJson.dependencies)) {
              if (version === 'workspace:*') {
                pkgJson.dependencies[dep] = '*';
              }
            }
          }

          // Update devDependencies
          if (pkgJson.devDependencies) {
            for (const [dep, version] of Object.entries(
              pkgJson.devDependencies
            )) {
              if (version === 'workspace:*') {
                pkgJson.devDependencies[dep] = '*';
              }
            }
          }

          writeFileSync(pkgJsonPath, `${JSON.stringify(pkgJson, null, 2)}\n`);
        }
      }
    }

    log(chalk.green('Deleting internal content...'));
    for (const dir of [
      join('.github', 'workflows'),
      'docs',
      'splash',
      'scripts',
    ]) {
      rmSync(dir, { recursive: true, force: true });
    }
    for (const file of [
      join('.github', 'CONTRIBUTING.md'),
      join('.github', 'FUNDING.yml'),
      join('.github', 'SECURITY.md'),
      '.autorc',
      'CHANGELOG.md',
      'license.md',
    ]) {
      if (existsSync(file)) {
        unlinkSync(file);
      }
    }

    log(chalk.green('Installing dependencies...'));
    const suffix = packageManager === 'npm' ? '--force' : '';
    execSync(`${packageManager} install ${suffix}`, execSyncOpts);

    log(chalk.green('Re-initializing git repository after install...'));
    execSync('git init', execSyncOpts);
    execSync('git add .', execSyncOpts);
    execSync('git commit -m "✨ Initial commit"', execSyncOpts);

    log(chalk.green('Copying .env.example files to .env.local...'));

    for (const path of [
      join('apps', 'api'),
      join('apps', 'app'),
      join('apps', 'web'),
      join('packages', 'cms'),
    ]) {
      copyFileSync(join(path, '.env.example'), join(path, '.env.local'));
    }
    copyFileSync(
      join('packages', 'database', '.env.example'),
      join('packages', 'database', '.env')
    );

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
};
