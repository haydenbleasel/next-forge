import { execSync } from 'node:child_process';
import { copyFile, mkdir, rmdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import {
  url,
  allInternalContent,
  cleanFileName,
  execSyncOpts,
  log,
  semver,
  tempDirName,
} from './utils.mjs';

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

  execSync(`git checkout v${version}`, execSyncOpts);

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
 * Gets a version from the user
 * @param {'to' | 'from'} type - The type of version to get
 * @returns {Promise<string>} - The version
 */
const getVersion = async (type) =>
  await input({
    message: `What version are you updating ${type}?`,
    required: true,
    validate: (value) =>
      semver.test(value) ||
      'Please enter a valid version without the "v" e.g. 1.2.3',
  });

/**
 * Gets the diff between two versions
 * @param {Object} from - The from version
 * @param {string} from.version - The from version
 * @param {string[]} from.files - The files in the from version
 * @param {Object} to - The to version
 * @param {string} to.version - The to version
 * @param {string[]} to.files - The files in the to version
 * @returns {Promise<string[]>} - The files to update
 */
const getDiff = async (from, to) => {
  log(chalk.blue('Computing diff between versions...'));
  const filesToUpdate = [];

  for (const file of to.files) {
    // Skip internal content that is meant to be deleted during init
    if (allInternalContent.some((ic) => file.startsWith(ic))) {
      continue;
    }

    const hasChanged =
      !from.files.includes(file) ||
      execSync(
        `git diff ${from.version} ${to.version} -- "${cleanFileName(file)}"`
      )
        .toString()
        .trim() !== '';

    if (hasChanged) {
      filesToUpdate.push(file);
    }
  }

  return filesToUpdate;
};

/**
 * @param {Object} options
 * @param {string} options.from
 * @param {string} options.to
 */
export const update = async (options) => {
  try {
    const cwd = process.cwd();

    const fromVersion = options.from || (await getVersion('from'));
    const toVersion = options.to || (await getVersion('to'));

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

    const diff = await getDiff(
      {
        version: from,
        files: fromFiles,
      },
      {
        version: to,
        files: toFiles,
      }
    );

    // Move back to the original directory
    process.chdir(cwd);

    await updateFiles(diff);
    await deleteTemporaryDirectory();

    log(chalk.green(`Successfully updated project from ${from} to ${to}!`));
    log(chalk.yellow('Note: Please review and test the changes carefully.'));
  } catch (error) {
    log(chalk.red('Failed to update project:', error.message));
    process.exit(1);
  }
};
