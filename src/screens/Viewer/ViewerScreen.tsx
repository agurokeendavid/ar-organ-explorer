import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../../app/navigation/types';
import { colors, spacing, textStyles } from '../../theme/tokens';

export function ViewerScreen({ route }: RootStackScreenProps<'Viewer'>) {
  const { organId, partName } = route.params;

  return (
    <View style={styles.screen}>
      <Text style={[textStyles.h1, styles.heading]}>3D viewer</Text>
      <Text style={[textStyles.body, styles.body]}>
        {organId}
        {partName ? ` · ${partName}` : ''} — viewer lands in M6.
      </Text>
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
    backgroundColor: colors.bg.app,
  },
  heading: {
    color: colors.text.primary,
  },
  body: {
    color: colors.text.body,
    textAlign: 'center',
  },
});
