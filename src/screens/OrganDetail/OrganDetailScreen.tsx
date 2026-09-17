import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { PartChip } from '../../components/PartChip';
import { ScreenBackHeader } from '../../components/ScreenBackHeader';
import { RootStackScreenProps } from '../../app/navigation/types';
import { getOrgan } from '../../data/content';
import { colors, fontFamily, radius, spacing, textStyles } from '../../theme/tokens';

export function OrganDetailScreen({ route, navigation }: RootStackScreenProps<'OrganDetail'>) {
  const { organId, partName } = route.params;
  const organ = getOrgan(organId);
  const [selectedPart, setSelectedPart] = useState(partName ?? organ?.parts[0]?.name);

  if (!organ) {
    return null;
  }

  const activePart = organ.parts.find(part => part.name === selectedPart) ?? organ.parts[0];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScreenBackHeader title={organ.name} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.modelStage} />

        <Text style={textStyles.h1}>{organ.name}</Text>
        <Text style={[textStyles.bodyLg, styles.blurb]}>{organ.blurb}</Text>

        <View style={styles.statsRow}>
          {organ.stats.map(stat => (
            <View key={stat.label} style={styles.statTile}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={[textStyles.bodySm, styles.statLabel]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.partChips}>
          {organ.parts.map(part => (
            <PartChip
              key={part.name}
              label={part.name}
              selected={part.name === activePart.name}
              onPress={() => setSelectedPart(part.name)}
              style={styles.partChipPadding}
            />
          ))}
        </View>

        <Text style={[textStyles.bodyLg, styles.partDescription]}>{activePart.description}</Text>

        <View style={styles.actions}>
          <Button
            label="See it in AR"
            onPress={() => navigation.navigate('ARScan', { organId: organ.id })}
          />
          <Button
            label="Open 3D viewer"
            variant="ghost"
            onPress={() =>
              navigation.navigate('Viewer', { organId: organ.id, partName: activePart.name })
            }
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
  body: {
    paddingHorizontal: spacing[20],
    paddingBottom: spacing[20],
    gap: spacing[15],
  },
  modelStage: {
    height: 220,
    borderRadius: radius.lg,
    backgroundColor: colors.surface.sunken,
  },
  blurb: {
    color: colors.text.body,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing[12],
  },
  statTile: {
    flex: 1,
    backgroundColor: colors.surface.default,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing[14],
    gap: spacing[3],
  },
  statValue: {
    fontFamily: fontFamily.displayExtraBold,
    fontSize: 22,
    color: colors.text.primary,
  },
  statLabel: {
    color: colors.text.muted,
  },
  partChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[8],
  },
  partChipPadding: {
    paddingHorizontal: spacing[13],
    paddingVertical: spacing[8],
  },
  partDescription: {
    color: colors.text.body,
  },
  actions: {
    gap: spacing[10],
  },
});
