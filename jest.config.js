module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-safe-area-context|react-native-worklets|@react-navigation)/)',
  ],
  setupFiles: ['react-native-gesture-handler/jestSetup'],
};
