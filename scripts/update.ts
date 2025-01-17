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

const getCurrentVersion = async (): Promise<string | undefined> => {
  const packageJsonPath = join(process.cwd(), 'package.json');
  const packageJsonContents = await readFile(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContents) as { version?: string };

  return packageJson.version;
};

const selectVersion = async (
  availableVersions: string[],
  initialValue: string | undefined
) => {
  const version = await select({
    message: 'Select a version to update to:',
    options: availableVersions.map((v) => ({ value: v, label: `v${v}` })),
    initialValue,
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
    const s1 = spinner();

    s1.start('Getting available versions...');
    const availableVersions = await getAvailableVersions();

    s1.message('Getting current version from package.json...');
    let currentVersion = await getCurrentVersion();

    // Ditch the project version if it is not in the available versions
    if (currentVersion && !availableVersions.includes(currentVersion)) {
      s1.message('Current version is not a valid next-forge version....');
      currentVersion = undefined;
    }

    s1.stop();

    const fromVersion =
      options.from || (await selectVersion(availableVersions, currentVersion));

    if (fromVersion === availableVersions[0]) {
      outro('You are already on the latest version!');
      return;
    }

    const upgradeableVersions = currentVersion
      ? availableVersions.filter(
          (v) => compareVersions(v, currentVersion ?? '') > 0
        )
      : availableVersions;

    const nextVersion = upgradeableVersions[0];

    const toVersion =
      options.to || (await selectVersion(upgradeableVersions, nextVersion));

    const from = `v${fromVersion}`;
    const to = `v${toVersion}`;

    const s2 = spinner();

    s2.start(`Preparing to update from ${from} to ${to}...`);

    s2.message('Creating temporary directory...');
    await createTemporaryDirectory(tempDirName);

    s2.message('Cloning next-forge...');
    await cloneRepository(tempDirName);

    s2.message('Moving into repository...');
    process.chdir(tempDirName);

    s2.message(`Getting files from version ${from}...`);
    const fromFiles = await getFiles(from);

    s2.message(`Getting files from version ${to}...`);
    const toFiles = await getFiles(to);

    s2.message(`Computing diff between versions ${from} and ${to}...`);
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

    s2.message('Moving back to original directory...');
    process.chdir(cwd);

    s2.message(`Updating ${diff.length} files...`);
    await updateFiles(diff);

    s2.message('Cleaning up...');
    await deleteTemporaryDirectory();

    s2.stop(`Successfully updated project from ${from} to ${to}!`);

    outro('Please review and test the changes carefully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`;

    log.error(`Failed to update project: ${message}`);
    process.exit(1);
  }
};
