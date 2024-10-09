const { defineConfig } = require('webpack-merge');
const { overrideDevServer } = require('customize-cra');

module.exports = overrideDevServer((config) => {
  config.devServer = {
    ...config.devServer,
    allowedHosts: 'all',
  };
  return config;
});
