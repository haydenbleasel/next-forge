#!/usr/bin/env node

import { program } from 'commander';
import { initialize } from './initialize.mjs';
import { update } from './update.mjs';

program
  .command('init <name>')
  .description('Initialize a new next-forge project')
  .option(
    '--package-manager <manager>',
    'Package manager to use (npm, yarn, bun, pnpm)',
    'pnpm'
  )
  .action(initialize);

program
  .command('update')
  .description('Update the project from one version to another')
  .option('--from <version>', 'Version to update from')
  .option('--to <version>', 'Version to update to')
  .action(update);

program.parse(process.argv);
