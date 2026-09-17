import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { motion } from '../theme/tokens';

export function usePressScale() {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withTiming(motion.pressScale, { duration: motion.cardPress.duration });
  };

  const onPressOut = () => {
    scale.value = withTiming(1, { duration: motion.cardPress.duration });
  };

  return { style, onPressIn, onPressOut };
}
