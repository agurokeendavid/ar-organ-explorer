import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../../app/navigation/types';
import { colors, spacing, textStyles } from '../../theme/tokens';

export function QuizScreen({ route }: RootStackScreenProps<'Quiz'>) {
  const { organId } = route.params;

  return (
    <View style={styles.screen}>
      <Text style={[textStyles.h1, styles.heading]}>Quiz</Text>
      <Text style={[textStyles.body, styles.body]}>{organId} — question runner lands in M5.</Text>
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
