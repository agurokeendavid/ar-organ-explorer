/**
 * Manual Jest mock for react-native-nitro-sqlite.
 *
 * It's a native Turbo/Nitro module with no Jest-compatible implementation,
 * so any test that merely renders a component tree touching src/data/db.ts
 * (without exercising real SQL) needs this to not throw. It always returns
 * an empty result set — real query behavior is verified on-device, and the
 * pure selector/badge-rule logic is unit tested directly against plain
 * data, not through this mock.
 */
function emptyResult() {
  return {
    rows: {
      _array: [],
      length: 0,
      item: () => undefined,
    },
  };
}

function open() {
  return {
    close: () => {},
    delete: () => {},
    execute: emptyResult,
    executeAsync: async () => emptyResult(),
  };
}

module.exports = {
  __esModule: true,
  open,
};
