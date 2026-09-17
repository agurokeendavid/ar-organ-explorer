import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, radius } from '../theme/tokens';
import { Icon } from './Icon';
import { usePressScale } from './usePressScale';

export type IconButtonProps = {
  name: string;
  onPress?: () => void;
  selected?: boolean;
};

export function IconButton({ name, onPress, selected = false }: IconButtonProps) {
  const { style: pressStyle, onPressIn, onPressOut } = usePressScale();

  return (
    <Animated.View style={pressStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        android_ripple={undefined}
        style={[styles.base, selected && styles.selected]}
      >
        <Icon name={name} size={20} color={selected ? colors.primary.default : colors.text.secondary} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.surface.sunkenAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: colors.primary.tint,
  },
});
