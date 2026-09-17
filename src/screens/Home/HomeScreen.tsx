import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from '../../components/Card';
import { Icon } from '../../components/Icon';
import { ProgressBar } from '../../components/ProgressBar';
import { SectionHeader } from '../../components/SectionHeader';
import { useActiveOrgan } from '../../app/providers/ActiveOrganProvider';
import { TabScreenProps } from '../../app/navigation/types';
import { getOrganProgress, getOrganProgressList, OrganProgress } from '../../features/lessons/organProgress';
import { colors, radius, spacing, textStyles } from '../../theme/tokens';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function HomeScreen({ navigation }: TabScreenProps<'HomeTab'>) {
  const { activeOrganId, setActiveOrganId } = useActiveOrgan();
  const [organs, setOrgans] = useState<OrganProgress[]>([]);

  useFocusEffect(
    useCallback(() => {
      setOrgans(getOrganProgressList());
    }, []),
  );

  const continueOrgan = getOrganProgress(activeOrganId) ?? organs[0];

  const openOrganDetail = (organProgress: OrganProgress) => {
    setActiveOrganId(organProgress.organ.id);
    navigation.navigate('OrganDetail', {
      organId: organProgress.organ.id,
      partName: organProgress.organ.parts[0]?.name,
    });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[textStyles.labelSm, styles.day]}>
              {DAY_NAMES[new Date().getDay()]}
            </Text>
            <Text style={[textStyles.h2, styles.greeting]}>Hi, Ana</Text>
          </View>
          <Pressable
            style={styles.profileButton}
            onPress={() => navigation.navigate('MeTab')}
          >
            <Icon name="person" size={22} color={colors.primary.default} />
          </Pressable>
        </View>

        <View style={styles.body}>
          {continueOrgan ? (
            <Card
              onPress={() =>
                navigation.navigate('Lesson', {
                  organId: continueOrgan.organ.id,
                  sectionIndex: continueOrgan.completed,
                })
              }
              style={styles.continueCard}
            >
              <View style={styles.continueThumbnail} />
              <View style={styles.continueDetails}>
                <Text style={[textStyles.metaStrong, styles.continueEyebrow]}>CONTINUE</Text>
                <Text style={textStyles.titleCard}>{continueOrgan.organ.lessonTitle}</Text>
                <View style={styles.continueProgressRow}>
                  <View style={styles.continueProgressTrack}>
                    <ProgressBar progress={continueOrgan.ratio} height={7} />
                  </View>
                  <Text style={[textStyles.meta, styles.continueRatio]}>
                    {continueOrgan.completed}/{continueOrgan.total}
                  </Text>
                </View>
              </View>
            </Card>
          ) : null}

          <Pressable
            style={({ pressed }) => [styles.arCard, pressed && styles.arCardPressed]}
            onPress={() => navigation.navigate('ARScan', { organId: activeOrganId })}
          >
            <View style={styles.arWell}>
              <Icon name="view-in-ar" size={24} color={colors.text.onDark} />
            </View>
            <View style={styles.arDetails}>
              <Text style={[textStyles.h3, styles.arTitle]}>Explore in AR</Text>
              <Text style={[textStyles.bodySm, styles.arBody]}>
                Place an organ on your table
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.text.onDark} />
          </Pressable>

          <Pressable style={styles.tutorCard} onPress={() => navigation.navigate('Tutor')}>
            <View style={styles.tutorWell}>
              <Icon name="smart-toy" size={22} color={colors.primary.default} />
            </View>
            <View style={styles.tutorDetails}>
              <Text style={textStyles.titleRow}>Ask the Tutor</Text>
              <Text style={[textStyles.bodySm, styles.tutorBody]}>
                Answers saved on this device
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.text.muted} />
          </Pressable>

          <SectionHeader
            title="Organ systems"
            actionLabel="All lessons"
            onActionPress={() => navigation.navigate('LessonsTab')}
          />

          <View style={styles.grid}>
            {organs.map(organProgress => (
              <Pressable
                key={organProgress.organ.id}
                style={styles.tile}
                onPress={() => openOrganDetail(organProgress)}
              >
                <View style={styles.tileThumbnail} />
                <Text style={textStyles.labelStrong}>{organProgress.organ.name}</Text>
                <Text style={[textStyles.meta, styles.tileRatio]}>
                  {organProgress.completed}/{organProgress.total}
                </Text>
              </Pressable>
            ))}
          </View>
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
    paddingBottom: spacing[16],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing[12],
    paddingHorizontal: spacing[20],
    paddingBottom: spacing[6],
  },
  day: {
    color: colors.text.muted,
  },
  greeting: {
    color: colors.text.primary,
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingTop: spacing[10],
    paddingHorizontal: spacing[20],
    gap: spacing[14],
  },
  continueCard: {
    flexDirection: 'row',
    gap: spacing[13],
    padding: spacing[14],
    borderRadius: radius.xl,
  },
  continueThumbnail: {
    width: 74,
    height: 74,
    borderRadius: radius.sm,
    backgroundColor: colors.surface.sunken,
  },
  continueDetails: {
    flex: 1,
    gap: spacing[6],
  },
  continueEyebrow: {
    color: colors.primary.default,
  },
  continueProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[8],
  },
  continueProgressTrack: {
    flex: 1,
  },
  continueRatio: {
    color: colors.text.muted,
  },
  arCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[14],
    backgroundColor: colors.dark.surface,
    borderRadius: radius.xl,
    paddingVertical: spacing[16],
    paddingHorizontal: spacing[18],
  },
  arCardPressed: {
    backgroundColor: colors.dark.pressed,
  },
  arWell: {
    width: 46,
    height: 46,
    borderRadius: radius.sm,
    backgroundColor: colors.accent.ar,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arDetails: {
    flex: 1,
    gap: spacing[3],
  },
  arTitle: {
    color: colors.text.onDark,
  },
  arBody: {
    color: colors.dark.textMuted,
  },
  tutorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[13],
    backgroundColor: colors.surface.default,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    paddingVertical: spacing[14],
    paddingHorizontal: spacing[16],
  },
  tutorWell: {
    width: 42,
    height: 42,
    borderRadius: radius.icon,
    backgroundColor: colors.surface.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tutorDetails: {
    flex: 1,
    gap: spacing[3],
  },
  tutorBody: {
    color: colors.text.muted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[12],
    paddingBottom: spacing[16],
  },
  tile: {
    width: '47%',
    gap: spacing[9],
    backgroundColor: colors.surface.default,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing[12],
  },
  tileThumbnail: {
    height: 74,
    borderRadius: radius.icon,
    backgroundColor: colors.surface.sunken,
  },
  tileRatio: {
    color: colors.text.muted,
  },
});
