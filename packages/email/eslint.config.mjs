import baseConfig from '@repo/eslint-config/index.mjs';

const config = [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
];

export default config;
