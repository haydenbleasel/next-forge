import { copyFile, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { input, select } from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';
import {
  url,
  exec,
  execSyncOpts,
  internalContentDirs,
  internalContentFiles,
  log,
} from './utils.mjs';

/**
 * Clones the next-forge template repository using the specified package manager
 * @param {string} name - The name of the project
 * @param {string} packageManager - The package manager to use (pnpm, npm, yarn, or bun)
 * @returns {Promise<void>}
 */
const cloneNextForge = async (name, packageManager) => {
  const command = [
    'npx create-next-app@latest',
    name,
    '--example',
    url,
    '--disable-git',
    '--skip-install',
    `--use-${packageManager}`,
  ];

  await exec(command.join(' '), execSyncOpts);
};

/**
 * Deletes internal content and files that are not needed in the new project
 * @returns {Promise<void>}
 */
const deleteInternalContent = async () => {
  for (const folder of internalContentDirs) {
    await rm(folder, { recursive: true, force: true });
  }

  for (const file of internalContentFiles) {
    await rm(file, { force: true });
  }
};

/**
 * Installs project dependencies using the specified package manager
 * @param {string} packageManager - The package manager to use (pnpm, npm, yarn, or bun)
 * @returns {Promise<void>}
 */
const installDependencies = async (packageManager) => {
  const suffix = packageManager === 'npm' ? '--force' : '';

  await exec(`${packageManager} install ${suffix}`, execSyncOpts);
};

/**
 * Initializes a new git repository and creates initial commit
 * @returns {Promise<void>}
 */
const initializeGit = async () => {
  await exec('git init', execSyncOpts);
  await exec('git add .', execSyncOpts);
  await exec('git commit -m "✨ Initial commit"', execSyncOpts);
};

/**
 * Sets up environment variables by copying example files
 * @returns {Promise<void>}
 */
const setupEnvironmentVariables = async () => {
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
 * @returns {Promise<void>}
 */
const setupOrm = async (packageManager) => {
  const filterCommand = packageManager === 'yarn' ? '--workspace' : '--filter';

  const command = [
    packageManager,
    'run',
    'build',
    filterCommand,
    '@repo/database',
  ].join(' ');

  await exec(command, execSyncOpts);
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
  const packageJsonPath = join(projectDir, 'package.json');
  const packageJsonFile = await readFile(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonFile);

  if (packageManager === 'bun') {
    packageJson.packageManager = 'bun@1.1.43';
  } else if (packageManager === 'npm') {
    packageJson.packageManager = 'npm@10.8.1';
  } else if (packageManager === 'yarn') {
    packageJson.packageManager = 'yarn@1.22.22';
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
 * @param {string} path - The package.json path
 * @returns {Promise<void>}
 */
const updateInternalPackageDependencies = async (path) => {
  const pkgJsonFile = await readFile(path, 'utf8');
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

  await writeFile(path, `${newPkgJson}\n`);
};

/**
 * Updates internal dependencies in all workspace packages
 * @param {string} projectDir - The project directory path
 * @returns {Promise<void>}
 */
const updateInternalDependencies = async (projectDir) => {
  const rootPackageJsonPath = join(projectDir, 'package.json');
  await updateInternalPackageDependencies(rootPackageJsonPath);

  const workspaceDirs = ['apps', 'packages'];

  for (const dir of workspaceDirs) {
    const dirPath = join(projectDir, dir);
    const packages = await readdir(dirPath);

    for (const pkg of packages) {
      const path = join(dirPath, pkg, 'package.json');
      await updateInternalPackageDependencies(path);
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
    message: 'Which package manager would you like to use?',
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

    if (!['npm', 'yarn', 'bun', 'pnpm'].includes(packageManager)) {
      throw new Error('Invalid package manager');
    }

    const title = ora('Creating new next-forge project...');
    title.color = 'yellow';
    title.start();

    const projectDir = join(cwd, name);
    await cloneNextForge(name, packageManager);
    process.chdir(projectDir);

    if (packageManager !== 'pnpm') {
      title.text = 'Updating package manager configuration...';
      await updatePackageManagerConfiguration(projectDir, packageManager);

      title.text = 'Updating workspace config...';
      await updateWorkspaceConfiguration(projectDir);

      title.text = 'Updating workspace dependencies...';
      await updateInternalDependencies(projectDir);
    }

    title.text = 'Deleting internal content...';
    await setupEnvironmentVariables();

    title.text = 'Deleting internal content...';
    await deleteInternalContent();

    title.text = 'Installing dependencies...';
    await installDependencies(packageManager);

    title.text = 'Setting up ORM...';
    await setupOrm(packageManager);

    if (!options.disableGit) {
      title.text = 'Initializing Git repository...';
      await initializeGit();
    }

    title.succeed('Project initialized successfully!');

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
