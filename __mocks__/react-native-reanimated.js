/**
 * Manual Jest mock for react-native-reanimated.
 *
 * The package's own testing shims (mock.js) chain into platform-specific
 * native/web entry points that aren't available under Jest for this
 * project (Android-only, no react-native-web). We only use a small slice
 * of the API — Animated.View/Text, useSharedValue, useAnimatedStyle and
 * withTiming — so a hand-written mock is simpler and more stable than
 * fighting the upstream resolver chain.
 */
const React = require('react');
const RN = require('react-native');

function useSharedValue(initial) {
  return React.useRef({ value: initial }).current;
}

function useAnimatedStyle(factory) {
  return factory();
}

function withTiming(toValue) {
  return toValue;
}

function withSpring(toValue) {
  return toValue;
}

const Animated = {
  View: RN.View,
  Text: RN.Text,
  ScrollView: RN.ScrollView,
  Image: RN.Image,
  createAnimatedComponent: Component => Component,
};

module.exports = {
  __esModule: true,
  default: Animated,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing: {
    out: fn => fn,
    ease: x => x,
    inOut: fn => fn,
  },
};
