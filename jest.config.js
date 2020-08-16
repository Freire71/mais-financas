module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    './src/config/Tests.js',
    '@testing-library/jest-native/extend-expect',
  ],
  testMatch: ['**/__tests__/?(*.)+(test).js'],
};
