import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, radius, spacing, textStyles } from '../theme/tokens';
import { usePressScale } from './usePressScale';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
};

export function Button({ label, onPress, variant = 'primary', disabled = false }: ButtonProps) {
  const { style: pressStyle, onPressIn, onPressOut } = usePressScale();

  return (
    <Animated.View style={disabled ? undefined : pressStyle}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={disabled ? undefined : onPressIn}
        onPressOut={disabled ? undefined : onPressOut}
        android_ripple={undefined}
        disabled={disabled}
        style={({ pressed }) => [
          styles.base,
          variant === 'primary' && styles.primary,
          variant === 'primary' && pressed && !disabled && styles.primaryPressed,
          disabled && styles.disabled,
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              textStyles.button,
              variant === 'primary' || disabled
                ? styles.labelOnFill
                : [styles.labelGhost, pressed && !disabled && styles.labelGhostPressed],
            ]}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[20],
  },
  primary: {
    backgroundColor: colors.primary.default,
  },
  primaryPressed: {
    backgroundColor: colors.primary.pressed,
  },
  disabled: {
    backgroundColor: colors.text.disabled,
  },
  labelOnFill: {
    color: colors.text.onDark,
  },
  labelGhost: {
    color: colors.text.secondary,
  },
  labelGhostPressed: {
    color: colors.text.primary,
  },
});
