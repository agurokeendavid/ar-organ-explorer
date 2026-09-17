import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { StatTile } from '../components/StatTile';
import { getEarnedBadgeKeys, evaluateAndPersistBadges } from '../data/repositories/badges';
import { getAllArPlacements, recordArPlacement } from '../data/repositories/arPlacement';
import { getAllProgress, markSectionComplete } from '../data/repositories/lessonProgress';
import { getAllQuizAttempts, recordQuizAttempt } from '../data/repositories/quizAttempt';
import { appendMessage, countUserQuestions } from '../data/repositories/tutorThread';
import { deleteDb, getDb } from '../data/db';
import { content } from '../data/content';
import {
  getContinueRatio,
  getDayStreak,
  getLessonsFinishedCount,
  getOrgansInArCount,
  getQuizzesTakenCount,
} from '../data/selectors';
import { colors, spacing, textStyles } from '../theme/tokens';

function readSnapshot() {
  const lessonProgress = getAllProgress();
  const quizAttempts = getAllQuizAttempts();
  const arPlacements = getAllArPlacements();
  const heart = content.organs.find(organ => organ.id === 'heart');

  return {
    lessonsFinished: getLessonsFinishedCount(lessonProgress),
    quizzesTaken: getQuizzesTakenCount(quizAttempts),
    organsInAr: getOrgansInArCount(arPlacements),
    dayStreak: getDayStreak([
      ...lessonProgress.map(row => row.completed_at),
      ...quizAttempts.map(row => row.taken_at),
      ...arPlacements.map(row => row.placed_at),
    ]),
    heartRatio: heart ? getContinueRatio('heart', lessonProgress, heart.totalLessons) : null,
    earnedBadges: getEarnedBadgeKeys(),
  };
}

export function DataLayerPanel() {
  const [snapshot, setSnapshot] = useState(() => {
    getDb();
    return readSnapshot();
  });

  const refresh = useCallback(() => {
    evaluateAndPersistBadges();
    setSnapshot(readSnapshot());
  }, []);

  const seedDemoProgress = useCallback(() => {
    const demo = content.demoProgress ?? {};
    for (const [organId, count] of Object.entries(demo)) {
      if (organId.startsWith('$')) continue;
      for (let i = 0; i < count; i += 1) {
        markSectionComplete(organId, i);
      }
    }
    refresh();
  }, [refresh]);

  const recordPerfectQuiz = useCallback(() => {
    recordQuizAttempt('heart', 5, 5, [1, 0, 2, 1, 3]);
    refresh();
  }, [refresh]);

  const placeInAr = useCallback(() => {
    recordArPlacement('heart');
    refresh();
  }, [refresh]);

  const askTutor = useCallback(() => {
    appendMessage('What does the heart do?', false);
    refresh();
  }, [refresh]);

  const resetData = useCallback(() => {
    deleteDb();
    getDb();
    setSnapshot(readSnapshot());
  }, []);

  return (
    <View style={styles.section}>
      <SectionHeader title="DATA LAYER (M2 smoke test)" />

      <View style={styles.rowGap}>
        <StatTile icon="menu-book" value={String(snapshot.lessonsFinished)} label="Lessons finished" />
        <StatTile icon="quiz" value={String(snapshot.quizzesTaken)} label="Quizzes taken" />
      </View>
      <View style={styles.rowGap}>
        <StatTile icon="view-in-ar" value={String(snapshot.organsInAr)} label="Organs in AR" />
        <StatTile icon="local-fire-department" value={String(snapshot.dayStreak)} label="Day streak" />
      </View>

      {snapshot.heartRatio ? (
        <Text style={[textStyles.bodySm, styles.meta]}>
          Heart continue ratio: {snapshot.heartRatio.completed}/{snapshot.heartRatio.total}
        </Text>
      ) : null}
      <Text style={[textStyles.bodySm, styles.meta]}>
        Tutor questions asked: {countUserQuestions()}
      </Text>
      <Text style={[textStyles.bodySm, styles.meta]}>
        Earned badges: {snapshot.earnedBadges.length > 0 ? snapshot.earnedBadges.join(', ') : 'none yet'}
      </Text>

      <View style={styles.stackGap}>
        <Button label="Seed demo progress" variant="ghost" onPress={seedDemoProgress} />
        <Button label="Record perfect heart quiz" variant="ghost" onPress={recordPerfectQuiz} />
        <Button label="Place heart in AR" variant="ghost" onPress={placeInAr} />
        <Button label="Ask a tutor question" variant="ghost" onPress={askTutor} />
        <Button label="Reset data" variant="ghost" onPress={resetData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing[12],
  },
  rowGap: {
    flexDirection: 'row',
    gap: spacing[12],
  },
  stackGap: {
    gap: spacing[12],
  },
  meta: {
    color: colors.text.muted,
  },
});
