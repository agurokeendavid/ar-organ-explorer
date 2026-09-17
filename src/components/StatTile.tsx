import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, textStyles } from '../theme/tokens';
import { Icon } from './Icon';

export type StatTileProps = {
  icon: string;
  value: string;
  label: string;
};

export function StatTile({ icon, value, label }: StatTileProps) {
  return (
    <View style={styles.base}>
      <View style={styles.iconWell}>
        <Icon name={icon} size={20} color={colors.primary.default} />
      </View>
      <Text style={[textStyles.h3, styles.value]}>{value}</Text>
      <Text style={[textStyles.bodySm, styles.label]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface.default,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing[16],
    gap: spacing[6],
  },
  iconWell: {
    width: 40,
    height: 40,
    borderRadius: radius.icon,
    backgroundColor: colors.surface.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: colors.text.primary,
  },
  label: {
    color: colors.text.muted,
  },
});
