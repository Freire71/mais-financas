module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
