import ultracite from 'ultracite';

for (const config of ultracite) {
  config.ignores = config.ignores || [];
  config.ignores.push('./components/ui/**/*');
}

export { default } from 'ultracite';
