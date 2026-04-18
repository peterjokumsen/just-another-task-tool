/// <reference types="jest" />
/// <reference types="node" />
module.exports = {
  displayName: 'jatt-mobile',
  preset: 'react-native',
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapper: {
    '[.]svg$': '@nx/react-native/plugins/jest/svg-mock',
  },
  transform: {
    '^.+[.](js|ts|tsx)$': [
      'babel-jest',
      {
        configFile: __dirname + '/.babelrc.js',
      },
    ],
    '^.+[.](bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
      'react-native/jest/assetFileTransformer.js',
    ),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(|keystone-v6-utils|@react-native|react-native|react-navigation|@react-navigation/.*|@sentry/react-native|@react-native-community|@nx/react-native|expo-font|expo-splash-screen|@expo-google-fonts/.*))',
  ],
  coverageDirectory: '../../coverage/apps/jatt-mobile',
  coverageReporters: ['text', 'cobertura'],
};
