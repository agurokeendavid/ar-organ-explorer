import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { RootStackScreenProps } from '../../app/navigation/types';
import { content, getQuestions } from '../../data/content';
import { colors, fontFamily, radius, spacing, textStyles } from '../../theme/tokens';

function getBadgeName(key: string): string {
  const earned = content.badges.earned.find(badge => badge.key === key);
  if (earned) return earned.name;
  const locked = content.badges.locked.find(badge => badge.key === key);
  return locked?.name ?? key;
}

export function ResultsScreen({ route, navigation }: RootStackScreenProps<'Results'>) {
  const { organId, answers, newBadgeKeys } = route.params;
  const questions = getQuestions(organId);
  const score = answers.filter((answer, i) => answer === questions[i]?.answer).length;
  const total = questions.length;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {newBadgeKeys.length > 0 ? (
          <View style={styles.badgeRow}>
            {newBadgeKeys.map(key => (
              <View key={key} style={styles.badgePill}>
                <Text style={[textStyles.labelSm, styles.badgePillText]}>{getBadgeName(key)}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <Text style={styles.score}>
          {score} / {total}
        </Text>
        <Text style={[textStyles.body, styles.note]}>
          {score >= 4 ? 'Strong work on the heart.' : 'Worth another look at sections 2 and 3.'}
        </Text>

        <View style={styles.reviewList}>
          {questions.map((question, index) => {
            const answer = answers[index];
            const isAnswered = answer !== null && answer !== undefined;
            const isCorrect = isAnswered && answer === question.answer;

            return (
              <View key={question.q} style={styles.reviewRow}>
                <Icon
                  name={!isAnswered ? 'remove' : isCorrect ? 'check' : 'close'}
                  size={20}
                  color={
                    !isAnswered
                      ? colors.text.faint
                      : isCorrect
                        ? colors.success.default
                        : colors.error.default
                  }
                />
                <View style={styles.reviewDetails}>
                  <Text style={[textStyles.bodySm, styles.reviewQuestion]}>{question.q}</Text>
                  <Text style={[textStyles.meta, styles.reviewAnswer]}>
                    {isAnswered ? `You said: ${question.options[answer]}` : 'Not answered'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.actions}>
          <Button
            label="Try again"
            onPress={() => navigation.replace('Quiz', { organId })}
          />
          <Button
            label="Back to lessons"
            variant="ghost"
            onPress={() => navigation.navigate('Tabs', { screen: 'LessonsTab' })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.app,
  },
  content: {
    padding: spacing[20],
    gap: spacing[16],
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[8],
  },
  badgePill: {
    backgroundColor: colors.accent.ar,
    borderRadius: radius.pill,
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[6],
  },
  badgePillText: {
    color: colors.text.onDark,
  },
  score: {
    fontFamily: fontFamily.displayExtraBold,
    fontSize: 40,
    color: colors.text.primary,
  },
  note: {
    color: colors.text.body,
  },
  reviewList: {
    gap: spacing[12],
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[12],
  },
  reviewDetails: {
    flex: 1,
    gap: spacing[3],
  },
  reviewQuestion: {
    color: colors.text.primary,
  },
  reviewAnswer: {
    color: colors.text.muted,
  },
  actions: {
    gap: spacing[10],
    marginTop: spacing[8],
  },
});
