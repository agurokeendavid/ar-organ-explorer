import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from './Icon';
import { colors, fontFamily, radius, spacing, textStyles } from '../theme/tokens';

export type ScreenBackHeaderProps = {
  title: string;
  subtitle?: string;
  onBack: () => void;
};

export function ScreenBackHeader({ title, subtitle, onBack }: ScreenBackHeaderProps) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <Icon name="arrow-back" size={20} color={colors.text.body} />
      </Pressable>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={[textStyles.micro, styles.subtitle]}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[10],
    paddingTop: spacing[8],
    paddingHorizontal: spacing[16],
    paddingBottom: spacing[12],
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: radius.icon,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.displayBold,
    fontSize: 15.5,
    color: colors.text.primary,
  },
  subtitle: {
    color: colors.text.muted,
  },
});
