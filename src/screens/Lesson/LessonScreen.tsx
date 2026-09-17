import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackScreenProps } from '../../app/navigation/types';
import { colors, spacing, textStyles } from '../../theme/tokens';

export function LessonScreen({ route }: RootStackScreenProps<'Lesson'>) {
  const { organId, sectionIndex = 0 } = route.params;

  return (
    <View style={styles.screen}>
      <Text style={[textStyles.h1, styles.heading]}>Lesson reader</Text>
      <Text style={[textStyles.body, styles.body]}>
        {organId} · section {sectionIndex} — full reader lands in M4.
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
