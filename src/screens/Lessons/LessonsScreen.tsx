import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Chip } from '../../components/Chip';
import { Icon } from '../../components/Icon';
import { ProgressBar } from '../../components/ProgressBar';
import { useActiveOrgan } from '../../app/providers/ActiveOrganProvider';
import { TabScreenProps } from '../../app/navigation/types';
import { content } from '../../data/content';
import { getOrganProgressList, OrganProgress } from '../../features/lessons/organProgress';
import { colors, fontFamily, radius, spacing, textStyles } from '../../theme/tokens';

type Filter = 'all' | 'started' | 'finished';

const totalLessons = content.organs.reduce((sum, organ) => sum + organ.totalLessons, 0);

function matchesFilter(organProgress: OrganProgress, filter: Filter): boolean {
  if (filter === 'started') {
    return organProgress.ratio > 0 && organProgress.ratio < 1;
  }
  if (filter === 'finished') {
    return organProgress.ratio >= 1;
  }
  return true;
}

export function LessonsScreen({ navigation }: TabScreenProps<'LessonsTab'>) {
  const { setActiveOrganId } = useActiveOrgan();
  const [organs, setOrgans] = useState<OrganProgress[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useFocusEffect(
    useCallback(() => {
      setOrgans(getOrganProgressList());
    }, []),
  );

  const visibleOrgans = useMemo(
    () => organs.filter(organProgress => matchesFilter(organProgress, filter)),
    [organs, filter],
  );

  const openOrganDetail = (organProgress: OrganProgress) => {
    setActiveOrganId(organProgress.organ.id);
    navigation.navigate('OrganDetail', {
      organId: organProgress.organ.id,
      partName: organProgress.organ.parts[0]?.name,
    });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={[textStyles.h2, styles.heading]}>Lessons</Text>
        <Text style={[textStyles.meta, styles.headingMeta]}>
          {content.organs.length} systems · {totalLessons} lessons
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.searchField}>
          <Icon name="search" size={20} color={colors.text.faint} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lessons…"
            placeholderTextColor={colors.text.muted}
            editable={false}
          />
        </View>

        <View style={styles.filterRow}>
          <Chip
            label="All"
            selected={filter === 'all'}
            onPress={() => setFilter('all')}
            style={styles.chipPadding}
          />
          <Chip
            label="Started"
            selected={filter === 'started'}
            onPress={() => setFilter('started')}
            style={styles.chipPadding}
          />
          <Chip
            label="Finished"
            selected={filter === 'finished'}
            onPress={() => setFilter('finished')}
            style={styles.chipPadding}
          />
        </View>

        {visibleOrgans.map(organProgress => (
          <Pressable
            key={organProgress.organ.id}
            style={styles.row}
            onPress={() => openOrganDetail(organProgress)}
          >
            <View style={styles.rowThumbnail} />
            <View style={styles.rowDetails}>
              <Text style={textStyles.titleRow}>{organProgress.organ.system}</Text>
              <Text style={[textStyles.bodySm, styles.rowBlurb]}>{organProgress.organ.blurb}</Text>
              <View style={styles.rowProgress}>
                <View style={styles.rowProgressTrack}>
                  <ProgressBar progress={organProgress.ratio} height={6} />
                </View>
                <Text style={[textStyles.meta, styles.rowRatio]}>
                  {organProgress.completed}/{organProgress.total}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.app,
  },
  header: {
    paddingTop: spacing[12],
    paddingHorizontal: spacing[20],
    paddingBottom: spacing[10],
    gap: spacing[3],
  },
  heading: {
    color: colors.text.primary,
  },
  headingMeta: {
    color: colors.text.muted,
  },
  content: {
    paddingHorizontal: spacing[20],
    paddingBottom: spacing[16],
    gap: spacing[11],
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[8],
    height: 44,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface.default,
    paddingHorizontal: spacing[14],
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.bodyRegular,
    fontSize: 15,
    color: colors.text.body,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing[8],
  },
  chipPadding: {
    paddingHorizontal: spacing[15],
    paddingVertical: spacing[3] + spacing[3],
  },
  row: {
    flexDirection: 'row',
    gap: spacing[13],
    backgroundColor: colors.surface.default,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing[13],
  },
  rowThumbnail: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.surface.sunken,
  },
  rowDetails: {
    flex: 1,
    gap: spacing[6],
  },
  rowBlurb: {
    color: colors.text.body,
  },
  rowProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[8],
  },
  rowProgressTrack: {
    flex: 1,
  },
  rowRatio: {
    color: colors.text.muted,
  },
});
