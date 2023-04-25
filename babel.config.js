const fs = require('fs');

const envFiles = {
  test: '.env.test',
  production: '.env',
  staging: '.env',
  sandbox: '.env',
  development: '.env',
};

module.exports = function (api) {
  const envFile = envFiles[api.env()];

  if (!envFile) {
    throw new Error(`The environment file "${envFile}" is not defined.`);
  }
  if (!fs.existsSync(envFile)) {
    throw new Error(`The environment file "${envFile}" doesn't exist.`);
  }

  return {
    presets: ['module:metro-react-native-babel-preset'],
    env: {
      production: {},
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '~/e2e': ['./e2e/'],
            '~/test': ['./test/'],
            '~/storybook': ['./storybook/'],
            '^~/(.+)': './app/\\1',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: envFile,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
    overrides: [
      {
        test: (fileName) => !fileName.includes('node_modules'),
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: false }],
        ],
      },
    ],
  };
};
