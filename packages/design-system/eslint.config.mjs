import ultracite from 'ultracite';

for (const config of ultracite) {
  config.ignores = config.ignores || [];
  config.ignores.push('./components/ui/**/*');

  config.settings = config.settings || {};
  config.settings.polyfills = config.settings.polyfills || [];
  config.settings.polyfills.push(
    // These are from Next.js - https://nextjs.org/docs/architecture/supported-browsers#polyfills
    'fetch',
    'URL',
    'Object.assign',

    // This one is running on the server
    'URLSearchParams'
  );
}

export { default } from 'ultracite';
