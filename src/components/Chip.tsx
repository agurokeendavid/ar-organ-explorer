import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, radius, spacing, textStyles } from '../theme/tokens';
import { usePressScale } from './usePressScale';

export type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ label, selected = false, onPress, style }: ChipProps) {
  const { style: pressStyle, onPressIn, onPressOut } = usePressScale();

  return (
    <Animated.View style={pressStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        android_ripple={undefined}
        style={[styles.base, selected && styles.selected, style]}
      >
        <Text style={[textStyles.chip, selected ? styles.labelSelected : styles.label]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface.default,
    borderRadius: radius.chip,
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[6],
  },
  selected: {
    borderColor: colors.primary.default,
    backgroundColor: colors.primary.default,
  },
  label: {
    color: colors.text.secondary,
  },
  labelSelected: {
    color: colors.text.onDark,
  },
});
