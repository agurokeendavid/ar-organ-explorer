import React, { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, radius, spacing } from '../theme/tokens';
import { usePressScale } from './usePressScale';

export type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, onPress, style }: CardProps) {
  const { style: pressStyle, onPressIn, onPressOut } = usePressScale();

  if (!onPress) {
    return <View style={[styles.base, style]}>{children}</View>;
  }

  return (
    <Animated.View style={pressStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        android_ripple={undefined}
        style={({ pressed }) => [styles.base, pressed && styles.pressed, style]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface.default,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing[16],
  },
  pressed: {
    borderColor: colors.primary.default,
  },
});
