import { execSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
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

/**
 * @param {Object} options
 * @param {string} options.from
 * @param {string} options.to
 */
export const update = (options) => {
  const cwd = process.cwd();
  const tempDir = join(cwd, 'next-forge-update');

  try {
    const from = options.from.startsWith('v')
      ? options.from
      : `v${options.from}`;
    const to = options.to.startsWith('v') ? options.to : `v${options.to}`;

    log(chalk.green(`Preparing to update from ${from} to ${to}...`));

    // Ensure git is available
    execSync('git --version', execSyncOpts);

    log(chalk.blue('Creating temporary directory...'));
    rmSync(tempDir, { recursive: true, force: true });
    mkdirSync(tempDir);

    log(chalk.blue('Cloning next-forge...'));
    execSync(`git clone ${url} ${tempDir}`, execSyncOpts);
    process.chdir(tempDir);

    log(chalk.blue(`Checking out version ${from}...`));
    execSync(`git checkout ${from}`, execSyncOpts);
    const fromFiles = execSync('git ls-files').toString().trim().split('\n');

    log(chalk.blue(`Checking out version ${to}...`));
    execSync(`git checkout ${to}`, execSyncOpts);
    const toFiles = execSync('git ls-files').toString().trim().split('\n');

    log(chalk.blue('Computing diff between versions...'));
    const filesToUpdate = toFiles.filter((file) => {
      if (allInternalContent.some((ic) => file.startsWith(ic))) {
        // Skip internal content that is meant to be deleted during init
        return false;
      }

      const hasChanged =
        !fromFiles.includes(file) ||
        execSync(`git diff ${from} ${to} -- "${cleanFileName(file)}"`)
          .toString()
          .trim() !== '';

      return hasChanged;
    });

    log(
      chalk.green(
        `Found ${filesToUpdate.length} files to update, applying updates...`
      )
    );

    process.chdir(cwd);

    for (const file of filesToUpdate) {
      const sourcePath = join(tempDir, file);
      const destPath = join(cwd, file);

      // Ensure destination directory exists
      mkdirSync(dirname(destPath), { recursive: true });

      // Copy file if it doesn't exist, or overwrite if it's different
      if (
        !existsSync(destPath) ||
        readFileSync(sourcePath).toString() !==
          readFileSync(destPath).toString()
      ) {
        log(chalk.blue(`Updating ${file}...`));
        copyFileSync(sourcePath, destPath);
      }
    }

    log(chalk.blue('Cleaning up...'));
    rmSync(tempDir, { recursive: true, force: true });

    log(chalk.green(`Successfully updated project from ${from} to ${to}!`));
    log(chalk.yellow('Note: Please review and test the changes carefully.'));
  } catch (error) {
    log(chalk.red('Failed to update project:', error.message));
    process.exit(1);
  }
};
