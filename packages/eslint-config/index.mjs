import harmony from 'eslint-config-harmony';
import { resolve } from 'node:path';

const project = resolve(process.cwd(), "tsconfig.json");

harmony.forEach((config) => {
  config.settings = {
    ...config.settings,
    'import/resolver': {
      typescript: {
        project,
      },
    },
  };
});

export default harmony;