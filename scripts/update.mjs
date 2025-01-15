import { copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';
import {
  url,
  allInternalContent,
  cleanFileName,
  exec,
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
  const cwd = process.cwd();
  const tempDir = join(cwd, name);

  await rm(tempDir, { recursive: true, force: true });
  await mkdir(tempDir, { recursive: true });
};

/**
 * Clones the next-forge repository
 * @param {string} name - The name of the temporary directory
 * @returns {Promise<void>}
 */
const cloneRepository = async (name) => await exec(`git clone ${url} ${name}`);

/**
 * Gets the files in the repository for the specified version
 * @param {string} version - The version to check out
 * @returns {string[]} - The files in the repository
 */
const getFiles = async (version) => {
  await exec(`git checkout ${version}`);

  const response = await exec('git ls-files');
  const files = response.stdout.toString().trim().split('\n');

  return files;
};

/**
 * Updates the files in the project
 * @param {string[]} files - The files to update
 * @returns {Promise<void>}
 */
const updateFiles = async (files) => {
  const cwd = process.cwd();
  const tempDir = join(cwd, tempDirName);

  for (const file of files) {
    const sourcePath = join(tempDir, file);
    const destPath = join(cwd, file);

    // Ensure destination directory exists
    await mkdir(dirname(destPath), { recursive: true });

    await copyFile(sourcePath, destPath);
  }
};

/**
 * Deletes the temporary directory
 * @returns {Promise<void>}
 */
const deleteTemporaryDirectory = async () =>
  await rm(tempDirName, { recursive: true, force: true });

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
  const filesToUpdate = [];

  for (const file of to.files) {
    // Skip internal content that is meant to be deleted during init
    if (allInternalContent.some((ic) => file.startsWith(ic))) {
      continue;
    }

    const hasChanged =
      !from.files.includes(file) ||
      (
        await exec(
          `git diff ${from.version} ${to.version} -- "${cleanFileName(file)}"`,
          { maxBuffer: 1024 * 1024 * 1024 }
        )
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

    const title = ora(`Preparing to update from ${from} to ${to}...`);
    title.color = 'yellow';
    title.start();

    title.text = 'Creating temporary directory...';
    await createTemporaryDirectory(tempDirName);

    title.text = 'Cloning next-forge...';
    await cloneRepository(tempDirName);

    title.text = 'Moving into repository...';
    process.chdir(tempDirName);

    title.text = `Getting files from version ${from}...`;
    const fromFiles = await getFiles(from);

    title.text = `Getting files from version ${to}...`;
    const toFiles = await getFiles(to);

    title.text = `Computing diff between versions ${from} and ${to}...`;
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

    title.text = 'Moving back to original directory...';
    process.chdir(cwd);

    title.text = `Updating ${diff.length} files...`;
    await updateFiles(diff);

    title.text = 'Cleaning up...';
    await deleteTemporaryDirectory();

    title.succeed(`Successfully updated project from ${from} to ${to}!`);

    log(chalk.yellow('Please review and test the changes carefully.'));
  } catch (error) {
    log(chalk.red('Failed to update project:', error.message));
    process.exit(1);
  }
};
