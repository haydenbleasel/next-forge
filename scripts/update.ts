import { copyFile, mkdir, readFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  cancel,
  intro,
  isCancel,
  log,
  outro,
  select,
  spinner,
} from '@clack/prompts';
import {
  url,
  allInternalContent,
  cleanFileName,
  exec,
  getAvailableVersions,
  tempDirName,
} from './utils.js';

const createTemporaryDirectory = async (name: string) => {
  const cwd = process.cwd();
  const tempDir = join(cwd, name);

  await rm(tempDir, { recursive: true, force: true });
  await mkdir(tempDir, { recursive: true });
};

const cloneRepository = async (name: string) =>
  await exec(`git clone ${url} ${name}`);

const getFiles = async (version: string) => {
  await exec(`git checkout ${version}`);

  const response = await exec('git ls-files');
  const files = response.stdout.toString().trim().split('\n');

  return files;
};

const updateFiles = async (files: string[]) => {
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

const deleteTemporaryDirectory = async () =>
  await rm(tempDirName, { recursive: true, force: true });

const getCurrentVersion = async (): Promise<string> => {
  const packageJson = JSON.parse(await readFile('package.json', 'utf-8'));
  return packageJson.version;
};

const selectVersion = async (
  currentVersion: string,
  availableVersions: string[]
) => {
  log.info(`Current version: v${currentVersion}`);

  const compareVersions = (a: string, b: string) => {
    const [aMajor, aMinor, aPatch] = a.split('.').map(Number);
    const [bMajor, bMinor, bPatch] = b.split('.').map(Number);
    if (aMajor !== bMajor) {
      return aMajor - bMajor;
    }
    if (aMinor !== bMinor) {
      return aMinor - bMinor;
    }
    return aPatch - bPatch;
  };

  const newerVersions = availableVersions.filter(
    (v) => compareVersions(v, currentVersion) > 0
  );

  if (newerVersions.length === 0) {
    log.info('You are already on the latest version!');
    process.exit(0);
  }

  const version = await select({
    message: 'Select a version to update to:',
    options: newerVersions.map((v) => ({ value: v, label: `v${v}` })),
  });

  if (isCancel(version)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return version.toString();
};

const getDiff = async (
  from: { version: string; files: string[] },
  to: { version: string; files: string[] }
) => {
  const filesToUpdate: string[] = [];

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

export const update = async (options: { from?: string; to?: string }) => {
  try {
    intro("Let's update your next-forge project!");

    const cwd = process.cwd();
    const currentVersion = await getCurrentVersion();
    const availableVersions = await getAvailableVersions();

    const fromVersion = options.from || currentVersion;
    const toVersion =
      options.to || (await selectVersion(currentVersion, availableVersions));
    const from = `v${fromVersion}`;
    const to = `v${toVersion}`;

    const s = spinner();

    s.start(`Preparing to update from ${from} to ${to}...`);

    s.message('Creating temporary directory...');
    await createTemporaryDirectory(tempDirName);

    s.message('Cloning next-forge...');
    await cloneRepository(tempDirName);

    s.message('Moving into repository...');
    process.chdir(tempDirName);

    s.message(`Getting files from version ${from}...`);
    const fromFiles = await getFiles(from);

    s.message(`Getting files from version ${to}...`);
    const toFiles = await getFiles(to);

    s.message(`Computing diff between versions ${from} and ${to}...`);
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

    s.message('Moving back to original directory...');
    process.chdir(cwd);

    s.message(`Updating ${diff.length} files...`);
    await updateFiles(diff);

    s.message('Cleaning up...');
    await deleteTemporaryDirectory();

    s.stop(`Successfully updated project from ${from} to ${to}!`);

    outro('Please review and test the changes carefully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`;

    log.error(`Failed to update project: ${message}`);
    process.exit(1);
  }
};
