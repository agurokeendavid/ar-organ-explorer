import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/tokens';

export type IconProps = {
  name: string;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 24, color = colors.text.secondary }: IconProps) {
  return <MaterialIcons name={name} size={size} color={color} />;
}
