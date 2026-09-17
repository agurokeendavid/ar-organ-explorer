import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { ScreenBackHeader } from '../../components/ScreenBackHeader';
import { RootStackScreenProps } from '../../app/navigation/types';
import { getOrgan, getQuestions } from '../../data/content';
import { evaluateAndPersistBadges } from '../../data/repositories/badges';
import { recordQuizAttempt } from '../../data/repositories/quizAttempt';
import { colors, radius, spacing, textStyles } from '../../theme/tokens';

export function QuizScreen({ route, navigation }: RootStackScreenProps<'Quiz'>) {
  const { organId } = route.params;
  const organ = getOrgan(organId);
  const questions = getQuestions(organId);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    new Array(questions.length).fill(null),
  );

  if (!organ || questions.length === 0) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <ScreenBackHeader title="Quiz" onBack={() => navigation.goBack()} />
        <View style={styles.comingSoon}>
          <Text style={[textStyles.h3, styles.comingSoonHeading]}>Coming soon</Text>
          <Text style={[textStyles.body, styles.comingSoonBody]}>
            This system's quiz isn't written yet.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const question = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;
  const isCorrect = picked === question.answer;
  const qPct = (questionIndex + (checked ? 1 : 0)) / questions.length;

  const handlePrimaryPress = () => {
    if (!checked) {
      setChecked(true);
      setAnswers(prev => {
        const next = [...prev];
        next[questionIndex] = picked;
        return next;
      });
      return;
    }

    if (!isLastQuestion) {
      setQuestionIndex(questionIndex + 1);
      setPicked(null);
      setChecked(false);
      return;
    }

    const finalAnswers = [...answers];
    finalAnswers[questionIndex] = picked;
    const score = finalAnswers.filter((answer, i) => answer === questions[i].answer).length;

    recordQuizAttempt(organ.id, score, questions.length, finalAnswers.map(a => a ?? -1));
    const newBadgeKeys = evaluateAndPersistBadges();

    navigation.replace('Results', { organId: organ.id, answers: finalAnswers, newBadgeKeys });
  };

  const primaryLabel = !checked ? 'Check answer' : isLastQuestion ? 'See results' : 'Next question';

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenBackHeader
        title={`${organ.name} quiz`}
        subtitle={`${questionIndex + 1} of ${questions.length}`}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.progressTrack}>
        <ProgressBar progress={qPct} height={6} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={textStyles.h1}>{question.q}</Text>

        <View style={styles.options}>
          {question.options.map((option, index) => {
            const isPicked = picked === index;
            const isCorrectOption = index === question.answer;
            const showCorrect = checked && isCorrectOption;
            const showWrong = checked && isPicked && !isCorrectOption;

            return (
              <Pressable
                key={option}
                disabled={checked}
                onPress={() => setPicked(index)}
                style={[
                  styles.option,
                  isPicked && !checked && styles.optionSelected,
                  showCorrect && styles.optionCorrect,
                  showWrong && styles.optionWrong,
                ]}
              >
                <View
                  style={[
                    styles.radioDot,
                    isPicked && !checked && styles.radioDotSelected,
                    showCorrect && styles.radioDotCorrect,
                    showWrong && styles.radioDotWrong,
                  ]}
                />
                <Text style={[textStyles.bodyLg, styles.optionText]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>

        {checked ? (
          <View>
            <Text
              style={[
                textStyles.metaStrong,
                isCorrect ? styles.verdictCorrect : styles.verdictWrong,
              ]}
            >
              {isCorrect ? 'CORRECT' : 'NOT QUITE'}
            </Text>
            <Text style={[textStyles.bodySm, styles.explanation]}>{question.why}</Text>
          </View>
        ) : null}

        <Button label={primaryLabel} onPress={handlePrimaryPress} disabled={picked === null} />
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
  progressTrack: {
    paddingHorizontal: spacing[20],
    paddingBottom: spacing[16],
  },
  body: {
    paddingHorizontal: spacing[20],
    paddingBottom: spacing[20],
    gap: spacing[16],
  },
  options: {
    gap: spacing[10],
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[12],
    backgroundColor: colors.surface.default,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing[14],
    paddingHorizontal: spacing[15],
  },
  optionSelected: {
    backgroundColor: colors.surface.tint,
    borderColor: colors.primary.default,
  },
  optionCorrect: {
    backgroundColor: colors.success.bg,
    borderColor: colors.success.default,
  },
  optionWrong: {
    backgroundColor: colors.error.bg,
    borderColor: colors.error.default,
  },
  optionText: {
    flex: 1,
    color: colors.text.primary,
  },
  radioDot: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.text.disabled,
  },
  radioDotSelected: {
    borderColor: colors.primary.default,
  },
  radioDotCorrect: {
    borderColor: colors.success.default,
  },
  radioDotWrong: {
    borderColor: colors.error.default,
  },
  verdictCorrect: {
    color: colors.success.default,
  },
  verdictWrong: {
    color: colors.error.default,
  },
  explanation: {
    color: colors.text.body,
    marginTop: spacing[5],
  },
});
