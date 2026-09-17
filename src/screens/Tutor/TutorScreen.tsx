import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, textStyles } from '../../theme/tokens';

export function TutorScreen() {
  return (
    <View style={styles.screen}>
      <Text style={[textStyles.h1, styles.heading]}>AI Tutor</Text>
      <Text style={[textStyles.body, styles.body]}>Chat UI lands in M9.</Text>
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
