import { execSync } from 'node:child_process';
import {
  copyFile,
  exists,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import { join } from 'node:path';
import { input, select } from '@inquirer/prompts';
import chalk from 'chalk';
import {
  url,
  execSyncOpts,
  internalContentDirs,
  internalContentFiles,
  log,
  runCommand,
} from './utils.mjs';

/**
 * Clones the next-forge template repository using the specified package manager
 * @param {string} name - The name of the project
 * @param {string} packageManager - The package manager to use (pnpm, npm, yarn, or bun)
 * @returns {void}
 */
const cloneNextForge = (name, packageManager) => {
  log(chalk.green('Creating new next-forge project...'));

  const command = [
    runCommand[packageManager],
    name,
    '--example',
    url,
    '--disable-git',
    '--skip-install',
    `--use-${packageManager}`,
  ];

  return execSync(command.join(' '), execSyncOpts);
};

/**
 * Deletes internal content and files that are not needed in the new project
 * @returns {Promise<void>}
 */
const deleteInternalContent = async () => {
  log(chalk.green('Deleting internal content...'));

  for (const folder of internalContentDirs) {
    await rm(folder, { recursive: true, force: true });
  }

  for (const file of internalContentFiles) {
    if (await exists(file)) {
      await rm(file);
    }
  }
};

/**
 * Installs project dependencies using the specified package manager
 * @param {string} packageManager - The package manager to use (pnpm, npm, yarn, or bun)
 * @returns {void}
 */
const installDependencies = (packageManager) => {
  log(chalk.green('Installing dependencies...'));

  const suffix = packageManager === 'npm' ? '--force' : '';

  execSync(`${packageManager} install ${suffix}`, execSyncOpts);
};

/**
 * Initializes a new git repository and creates initial commit
 * @returns {void}
 */
const initializeGit = () => {
  log(chalk.green('Re-initializing git repository after install...'));

  execSync('git init', execSyncOpts);
  execSync('git add .', execSyncOpts);
  execSync('git commit -m "✨ Initial commit"', execSyncOpts);
};

/**
 * Sets up environment variables by copying example files
 * @returns {Promise<void>}
 */
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

/**
 * Sets up Prisma ORM by running the build command
 * @param {string} packageManager - The package manager to use
 * @returns {void}
 */
const setupOrm = (packageManager) => {
  log(chalk.green('Setting up Prisma...'));

  const command = [
    packageManager,
    'run',
    'build',
    '--filter',
    '@repo/database',
  ];

  return execSync(command.join(' '), execSyncOpts);
};

/**
 * Updates the package manager configuration in package.json
 * @param {string} projectDir - The project directory path
 * @param {string} packageManager - The package manager to use
 * @returns {Promise<void>}
 */
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

/**
 * Updates workspace configuration in package.json and removes pnpm specific files
 * @param {string} projectDir - The project directory path
 * @returns {Promise<void>}
 */
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

/**
 * Updates internal package dependencies in a specific package
 * @param {string} projectDir - The project directory path
 * @param {string} dir - The directory containing the package
 * @param {string} pkg - The package name
 * @returns {Promise<void>}
 */
const updateInternalPackageDependencies = async (projectDir, dir, pkg) => {
  const pkgJsonPath = join(projectDir, dir, pkg, 'package.json');
  const doesExist = await exists(pkgJsonPath);

  if (!doesExist) {
    return;
  }

  const pkgJsonFile = await readFile(pkgJsonPath, 'utf8');
  const pkgJson = JSON.parse(pkgJsonFile);

  if (pkgJson.dependencies) {
    // Update dependencies
    const entries = Object.entries(pkgJson.dependencies);

    for (const [dep, version] of entries) {
      if (version === 'workspace:*') {
        pkgJson.dependencies[dep] = '*';
      }
    }
  }

  if (pkgJson.devDependencies) {
    // Update devDependencies
    const entries = Object.entries(pkgJson.devDependencies);

    for (const [dep, version] of entries) {
      if (version === 'workspace:*') {
        pkgJson.devDependencies[dep] = '*';
      }
    }
  }

  const newPkgJson = JSON.stringify(pkgJson, null, 2);

  await writeFile(pkgJsonPath, `${newPkgJson}\n`);
};

/**
 * Updates internal dependencies in all workspace packages
 * @param {string} projectDir - The project directory path
 * @returns {Promise<void>}
 */
const updateInternalDependencies = async (projectDir) => {
  log(chalk.green('Updating workspace dependencies...'));

  const workspaceDirs = ['apps', 'packages'];

  for (const dir of workspaceDirs) {
    const dirPath = join(projectDir, dir);
    const packages = await readdir(dirPath);

    for (const pkg of packages) {
      await updateInternalPackageDependencies(projectDir, dir, pkg);
    }
  }
};

/**
 * Gets the project name from the user
 * @returns {Promise<string>}
 */
const getName = async () =>
  await input({
    message: 'What is your project named?',
    required: true,
  });

/**
 * Gets the package manager from the user
 * @returns {Promise<'pnpm' | 'npm' | 'yarn' | 'bun'>}
 */
const getPackageManager = async () =>
  await select({
    message: 'What package manager do you want to use?',
    choices: ['pnpm', 'npm', 'yarn', 'bun'],
    default: 'pnpm',
  });

/**
 * Initializes a new next-forge project
 * @param {Object} options - The initialization options
 * @param {string} [options.name] - The project name
 * @param {string} [options.packageManager] - The package manager to use
 * @param {boolean} [options.disableGit] - Whether to disable git
 * @returns {Promise<void>}
 */
export const initialize = async (options) => {
  try {
    const cwd = process.cwd();
    const name = options.name || (await getName());
    const packageManager =
      options.packageManager || (await getPackageManager());

    if (!(packageManager in runCommand)) {
      throw new Error('Invalid package manager');
    }

    const projectDir = join(cwd, name);
    cloneNextForge(name, packageManager);
    process.chdir(projectDir);

    if (packageManager !== 'pnpm') {
      await updatePackageManagerConfiguration(projectDir, packageManager);
      await updateWorkspaceConfiguration(projectDir);
      await updateInternalDependencies(projectDir);
    }

    await setupEnvironmentVariables();

    deleteInternalContent();
    installDependencies(packageManager);
    setupOrm();

    if (!options.disableGit) {
      initializeGit();
    }

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
