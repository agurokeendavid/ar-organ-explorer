import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { ScreenBackHeader } from '../../components/ScreenBackHeader';
import { RootStackScreenProps } from '../../app/navigation/types';
import { getOrgan, getSections } from '../../data/content';
import { evaluateAndPersistBadges } from '../../data/repositories/badges';
import { markSectionComplete } from '../../data/repositories/lessonProgress';
import { colors, radius, spacing, textStyles } from '../../theme/tokens';

export function LessonScreen({ route, navigation }: RootStackScreenProps<'Lesson'>) {
  const { organId, sectionIndex: initialSectionIndex = 0 } = route.params;
  const organ = getOrgan(organId);
  const sections = getSections(organId);
  const [sectionIndex, setSectionIndex] = useState(
    Math.min(Math.max(initialSectionIndex, 0), Math.max(sections.length - 1, 0)),
  );

  if (!organ || sections.length === 0) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <ScreenBackHeader title="Lesson" onBack={() => navigation.goBack()} />
        <View style={styles.comingSoon}>
          <Text style={[textStyles.h3, styles.comingSoonHeading]}>Coming soon</Text>
          <Text style={[textStyles.body, styles.comingSoonBody]}>
            This system's lesson isn't written yet.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const section = sections[sectionIndex];
  const isLastSection = sectionIndex === sections.length - 1;

  const advance = () => {
    markSectionComplete(organ.id, sectionIndex);
    evaluateAndPersistBadges();

    if (isLastSection) {
      navigation.navigate('Quiz', { organId: organ.id });
    } else {
      setSectionIndex(sectionIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenBackHeader
        title={organ.lessonTitle}
        subtitle={`Section ${sectionIndex + 1} of ${sections.length}`}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.stepBars}>
        {sections.map((_, index) => (
          <View
            key={index}
            style={[styles.stepBar, index <= sectionIndex && styles.stepBarActive]}
          />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.figureStage} />

        <Text style={textStyles.h1}>{section.title}</Text>
        <Text style={[textStyles.bodyLg, styles.sectionBody]}>{section.body}</Text>

        <View style={styles.keywordCard}>
          <Text style={textStyles.labelStrong}>{section.keyword}</Text>
          <Text style={[textStyles.bodySm, styles.keywordDefinition]}>{section.definition}</Text>
        </View>

        <Button label={isLastSection ? 'Take the quiz' : 'Next section'} onPress={advance} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.app,
  },
  comingSoon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[8],
    paddingHorizontal: spacing[24],
  },
  comingSoonHeading: {
    color: colors.text.primary,
  },
  comingSoonBody: {
    color: colors.text.body,
    textAlign: 'center',
  },
  stepBars: {
    flexDirection: 'row',
    gap: spacing[5],
    paddingHorizontal: spacing[20],
    paddingBottom: spacing[14],
  },
  stepBar: {
    flex: 1,
    height: 5,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  stepBarActive: {
    backgroundColor: colors.primary.default,
  },
  body: {
    paddingHorizontal: spacing[20],
    paddingBottom: spacing[20],
    gap: spacing[15],
  },
  figureStage: {
    height: 190,
    borderRadius: radius.lg,
    backgroundColor: colors.surface.sunken,
  },
  sectionBody: {
    color: colors.text.body,
  },
  keywordCard: {
    backgroundColor: colors.surface.default,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing[14],
    gap: spacing[5],
  },
  keywordDefinition: {
    color: colors.text.secondary,
  },
});
