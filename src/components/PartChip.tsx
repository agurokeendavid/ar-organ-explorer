import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, radius, spacing, textStyles } from '../theme/tokens';
import { usePressScale } from './usePressScale';

export type PartChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function PartChip({ label, selected = false, onPress, style }: PartChipProps) {
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
    backgroundColor: colors.surface.sunkenAlt,
    borderRadius: radius.chip,
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[6],
  },
  selected: {
    backgroundColor: colors.primary.default,
  },
  label: {
    color: colors.text.body,
  },
  labelSelected: {
    color: colors.text.onDark,
  },
});
