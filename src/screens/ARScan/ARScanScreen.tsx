import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../../app/navigation/types';
import { colors, spacing, textStyles } from '../../theme/tokens';

export function ARScanScreen({ route }: RootStackScreenProps<'ARScan'>) {
  const { organId } = route.params;

  return (
    <View style={styles.screen}>
      <Text style={[textStyles.h1, styles.heading]}>AR scan</Text>
      <Text style={[textStyles.body, styles.body]}>{organId} — AR flow lands in M7.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[8],
    paddingHorizontal: spacing[24],
    backgroundColor: colors.dark.surface,
  },
  heading: {
    color: colors.text.onDark,
  },
  body: {
    color: colors.dark.textMuted,
    textAlign: 'center',
  },
});
