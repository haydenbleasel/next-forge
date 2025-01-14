import { execSync } from 'node:child_process';
import { copyFile, mkdir, rmdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { input } from '@inquirer/prompts';
import chalk from 'chalk';

const { log } = console;
const url = 'https://github.com/haydenbleasel/next-forge';
const cleanFileName = (file) => file.replace(/"/g, '\\"').replace(/\\/g, '/');
const execSyncOpts = { stdio: 'ignore' };
const internalContentDirs = [join('.github', 'workflows'), 'docs', 'splash'];
const internalContentFiles = [
  join('.github', 'CONTRIBUTING.md'),
  join('.github', 'FUNDING.yml'),
  join('.github', 'SECURITY.md'),
  '.autorc',
  'CHANGELOG.md',
  'license.md',
];
const allInternalContent = [...internalContentDirs, ...internalContentFiles];
const semver = /^\d+\.\d+\.\d+$/;
const tempDirName = 'next-forge-update';

/**
 * Creates a temporary directory
 * @param {string} name - The name of the temporary directory
 * @returns {Promise<void>}
 */
const createTemporaryDirectory = async (name) => {
  log(chalk.blue(`Creating temporary directory: ${name}`));
  const cwd = process.cwd();
  const tempDir = join(cwd, name);

  await rmdir(tempDir, { recursive: true, force: true });
  await mkdir(tempDir, { recursive: true });
};

/**
 * Clones the next-forge repository
 * @param {string} name - The name of the temporary directory
 * @returns {Promise<void>}
 */
const cloneRepository = (name) => {
  log(chalk.blue('Cloning next-forge...'));

  execSync(`git clone ${url} ${name}`, execSyncOpts);
};

/**
 * Gets the files in the repository for the specified version
 * @param {string} version - The version to check out
 * @returns {string[]} - The files in the repository
 */
const getFiles = (version) => {
  log(chalk.blue(`Checking out version ${version}...`));

  execSync(`git checkout ${version}`, execSyncOpts);

  const files = execSync('git ls-files').toString().trim().split('\n');

  return files;
};

/**
 * Updates the files in the project
 * @param {string[]} files - The files to update
 * @returns {Promise<void>}
 */
const updateFiles = async (files) => {
  log(
    chalk.green(`Found ${files.length} files to update, applying updates...`)
  );

  const cwd = process.cwd();
  const tempDir = join(cwd, tempDirName);

  for (const file of files) {
    const sourcePath = join(tempDir, file);
    const destPath = join(cwd, file);

    // Ensure destination directory exists
    await mkdir(dirname(destPath), { recursive: true });

    log(chalk.blue(`Updating ${file}...`));
    await copyFile(sourcePath, destPath);
  }
};

/**
 * Deletes the temporary directory
 * @returns {Promise<void>}
 */
const deleteTemporaryDirectory = async () => {
  log(chalk.blue('Cleaning up...'));
  await rmdir(tempDirName, { recursive: true, force: true });
};

/**
 * @param {Object} options
 * @param {string} options.from
 * @param {string} options.to
 */
export const update = async (options) => {
  try {
    const cwd = process.cwd();

    const fromVersion =
      options.from ||
      (await input({
        message: 'What version are you updating from?',
        required: true,
        validate: (value) =>
          semver.test(value) ||
          'Please enter a valid version without the "v" e.g. 1.2.3',
      }));

    const toVersion =
      options.to ||
      (await input({
        message: 'What version are you updating to?',
        required: true,
        validate: (value) =>
          semver.test(value) ||
          'Please enter a valid version without the "v" e.g. 1.2.3',
      }));

    const from = `v${fromVersion}`;
    const to = `v${toVersion}`;

    log(chalk.green(`Preparing to update from ${from} to ${to}...`));

    // Ensure git is available
    execSync('git --version', execSyncOpts);

    await createTemporaryDirectory(tempDirName);
    cloneRepository(tempDirName);

    // Move into the repository
    process.chdir(tempDirName);

    const fromFiles = getFiles(from);
    const toFiles = getFiles(to);

    log(chalk.blue('Computing diff between versions...'));
    const filesToUpdate = [];

    for (const file of toFiles) {
      // Skip internal content that is meant to be deleted during init
      if (allInternalContent.some((ic) => file.startsWith(ic))) {
        continue;
      }

      const hasChanged =
        !fromFiles.includes(file) ||
        execSync(`git diff ${from} ${to} -- "${cleanFileName(file)}"`)
          .toString()
          .trim() !== '';

      if (hasChanged) {
        filesToUpdate.push(file);
      }
    }

    // Move back to the original directory
    process.chdir(cwd);

    await updateFiles(filesToUpdate);
    await deleteTemporaryDirectory();

    log(chalk.green(`Successfully updated project from ${from} to ${to}!`));
    log(chalk.yellow('Note: Please review and test the changes carefully.'));
  } catch (error) {
    log(chalk.red('Failed to update project:', error.message));
    process.exit(1);
  }
};
