#!/usr/bin/env node

import { program } from 'commander';
import { initialize } from './initialize.mjs';
import { update } from './update.mjs';

program
  .command('init')
  .description('Initialize a new next-forge project')
  .option('--name <name>', 'Name of the project', 'next-forge')
  .option(
    '--package-manager <manager>',
    'Package manager to use (npm, yarn, bun, pnpm)',
    'pnpm'
  )
  .option('--disable-git', 'Disable git initialization')
  .action(initialize);

program
  .command('update')
  .description('Update the project from one version to another')
  .option('--from <version>', 'Version to update from')
  .option('--to <version>', 'Version to update to')
  .action(update);

program.parse(process.argv);
