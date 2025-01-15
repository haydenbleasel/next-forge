import { exec as execRaw } from 'node:child_process';
import { join } from 'node:path';
import { promisify } from 'node:util';

export const { log } = console;

export const url = 'https://github.com/haydenbleasel/next-forge';

export const cleanFileName = (file) =>
  file.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\\/g, '/');

export const execSyncOpts = { stdio: 'ignore' };

export const internalContentDirs = [
  join('.github', 'workflows'),
  'docs',
  'splash',
];

export const internalContentFiles = [
  join('.github', 'CONTRIBUTING.md'),
  join('.github', 'FUNDING.yml'),
  join('.github', 'SECURITY.md'),
  '.autorc',
  'CHANGELOG.md',
  'license.md',
];

export const allInternalContent = [
  ...internalContentDirs,
  ...internalContentFiles,
];

export const semver = /^\d+\.\d+\.\d+$/;

export const tempDirName = 'next-forge-update';

export const exec = promisify(execRaw);
