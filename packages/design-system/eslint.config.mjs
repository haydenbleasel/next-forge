import baseConfig from '@repo/eslint-config/index.mjs';

const newBaseConfig = { ...baseConfig };

newBaseConfig.forEach((config) => {
  if (config.ignores) {
    config.ignores.push('./components/ui/**/*');
  } else {
    config.ignores = ['./components/ui/**/*'];
  }
});

const config = [
  ...newBaseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
];

export default config;
