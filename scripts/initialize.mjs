import { execSync } from 'node:child_process';
import {} from 'node:fs';
import {
  copyFile,
  exists,
  readFile,
  readdir,
  rm,
  rmdir,
  writeFile,
} from 'node:fs/promises';
import { join } from 'node:path';
import { input, select } from '@inquirer/prompts';
import chalk from 'chalk';

const { log } = console;
const execSyncOpts = { stdio: 'ignore' };
const url = 'https://github.com/haydenbleasel/next-forge';
const internalFolders = [
  join('.github', 'workflows'),
  'docs',
  'splash',
  'scripts',
];
const internalFiles = [
  join('.github', 'CONTRIBUTING.md'),
  join('.github', 'FUNDING.yml'),
  join('.github', 'SECURITY.md'),
  '.autorc',
  'CHANGELOG.md',
  'license.md',
];
const runCommand = {
  pnpm: 'pnpm create next-app@latest',
  npm: 'npx create-next-app@latest',
  yarn: 'yarn create next-app@latest',
  bun: 'bun create next-app@latest',
};

const cloneNextForge = (name, packageManager) => {
  log(chalk.green('Creating new next-forge project...'));

  return execSync(
    `${runCommand[packageManager]} ${name} --example "${url}" --disable-git`,
    execSyncOpts
  );
};

const deleteInternalContent = async () => {
  log(chalk.green('Deleting internal content...'));

  for (const folder of internalFolders) {
    await rmdir(folder, { recursive: true });
  }

  for (const file of internalFiles) {
    if (await exists(file)) {
      await rm(file);
    }
  }
};

const installDependencies = (packageManager) => {
  log(chalk.green('Installing dependencies...'));

  const suffix = packageManager === 'npm' ? '--force' : '';

  execSync(`${packageManager} install ${suffix}`, execSyncOpts);
};

const initializeGit = () => {
  log(chalk.green('Re-initializing git repository after install...'));

  execSync('git init', execSyncOpts);
  execSync('git add .', execSyncOpts);
  execSync('git commit -m "✨ Initial commit"', execSyncOpts);
};

const setupEnvironmentVariables = async () => {
  log(chalk.green('Copying .env.example files to .env.local...'));

  const files = [
    { source: join('apps', 'api'), target: '.env.local' },
    { source: join('apps', 'app'), target: '.env.local' },
    { source: join('apps', 'web'), target: '.env.local' },
    { source: join('packages', 'cms'), target: '.env.local' },
    { source: join('packages', 'database'), target: '.env' },
  ];

  for (const { source, target } of files) {
    await copyFile(join(source, '.env.example'), join(source, target));
  }
};

const setupOrm = (packageManager) => {
  log(chalk.green('Setting up Prisma...'));

  return execSync(
    `${packageManager} run build --filter @repo/database`,
    execSyncOpts
  );
};

const updatePackageManagerConfiguration = async (
  projectDir,
  packageManager
) => {
  log(chalk.green('Updating package manager configuration...'));

  const packageJsonPath = join(projectDir, 'package.json');
  const packageJsonFile = await readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonFile);

  if (packageManager === 'bun') {
    packageJson.packageManager = 'bun@1.1.43';
  } else if (packageManager === 'npm') {
    packageJson.packageManager = 'npm@10.8.1';
  } else if (packageManager === 'yarn') {
    packageJson.packageManager = 'yarn@4.6.0';
  }

  const newPackageJson = JSON.stringify(packageJson, null, 2);

  await writeFile(packageJsonPath, `${newPackageJson}\n`);
};

const updateWorkspaceConfiguration = async (projectDir) => {
  log(chalk.green('Updating workspace config...'));

  const packageJsonPath = join(projectDir, 'package.json');
  const packageJsonFile = await readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonFile);

  packageJson.workspaces = ['apps/*', 'packages/*'];

  const newPackageJson = JSON.stringify(packageJson, null, 2);

  await writeFile(packageJsonPath, `${newPackageJson}\n`);

  await rm('pnpm-lock.yaml', { force: true });
  await rm('pnpm-workspace.yaml', { force: true });
};

const updateInternalDependencies = async (projectDir) => {
  log(chalk.green('Updating workspace dependencies...'));

  const workspaceDirs = ['apps', 'packages'];

  for (const dir of workspaceDirs) {
    const dirPath = join(projectDir, dir);
    const packages = await readdir(dirPath);

    for (const pkg of packages) {
      const pkgJsonPath = join(projectDir, dir, pkg, 'package.json');
      const doesExist = await exists(pkgJsonPath);

      if (!doesExist) {
        continue;
      }

      const pkgJsonFile = await readFile(pkgJsonPath, 'utf8');
      const pkgJson = JSON.parse(pkgJsonFile);

      // Update dependencies
      if (pkgJson.dependencies) {
        const entries = Object.entries(pkgJson.dependencies);

        for (const [dep, version] of entries) {
          if (version === 'workspace:*') {
            pkgJson.dependencies[dep] = '*';
          }
        }
      }

      // Update devDependencies
      if (pkgJson.devDependencies) {
        const entries = Object.entries(pkgJson.devDependencies);

        for (const [dep, version] of entries) {
          if (version === 'workspace:*') {
            pkgJson.devDependencies[dep] = '*';
          }
        }
      }

      const newPkgJson = JSON.stringify(pkgJson, null, 2);

      await writeFile(pkgJsonPath, `${newPkgJson}\n`);
    }
  }
};

export const initialize = async (options) => {
  try {
    const cwd = process.cwd();
    let { name, packageManager } = options;

    if (!name) {
      name = await input({
        message: 'What is your project named?',
        required: true,
      });
    }

    if (!packageManager) {
      packageManager = await select({
        message: 'What package manager do you want to use?',
        choices: ['pnpm', 'npm', 'yarn', 'bun'],
        default: 'pnpm',
      });
    }

    const projectDir = join(cwd, name);
    await cloneNextForge(name, packageManager);
    process.chdir(projectDir);

    if (packageManager !== 'pnpm') {
      await updatePackageManagerConfiguration(projectDir, packageManager);
      await updateWorkspaceConfiguration(projectDir);
      await updateInternalDependencies(projectDir);
    }

    deleteInternalContent();
    installDependencies(packageManager);
    await initializeGit();
    await setupEnvironmentVariables();
    setupOrm();

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
