import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { Icon } from '../components/Icon';
import { IconButton } from '../components/IconButton';
import { PartChip } from '../components/PartChip';
import { ProgressBar } from '../components/ProgressBar';
import { SectionHeader } from '../components/SectionHeader';
import { Sheet } from '../components/Sheet';
import { StatTile } from '../components/StatTile';
import { colors, spacing, textStyles } from '../theme/tokens';
import { DataLayerPanel } from './DataLayerPanel';

function GallerySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={[textStyles.labelSm, styles.sectionLabel]}>{title}</Text>
      {children}
    </View>
  );
}

export function ComponentGallery() {
  const [chipSelected, setChipSelected] = useState(false);
  const [partChipSelected, setPartChipSelected] = useState(true);
  const [iconButtonSelected, setIconButtonSelected] = useState(false);
  const [lightSheetOpen, setLightSheetOpen] = useState(false);
  const [darkSheetOpen, setDarkSheetOpen] = useState(false);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[textStyles.h2, styles.heading]}>Component gallery</Text>
        <Text style={[textStyles.bodySm, styles.subheading]}>
          M1 primitives — Home screen lands in M3.
        </Text>

        <GallerySection title="BUTTON">
          <View style={styles.stackGap}>
            <Button label="Primary" onPress={() => {}} />
            <Button label="Ghost" variant="ghost" onPress={() => {}} />
            <Button label="Disabled" disabled onPress={() => {}} />
          </View>
        </GallerySection>

        <GallerySection title="CARD">
          <View style={styles.stackGap}>
            <Card>
              <Text style={textStyles.titleCard}>Static card</Text>
            </Card>
            <Card onPress={() => {}}>
              <Text style={textStyles.titleCard}>Tappable card — press to see border</Text>
            </Card>
          </View>
        </GallerySection>

        <GallerySection title="CHIP">
          <View style={styles.rowGap}>
            <Chip label="Unselected" selected={false} onPress={() => setChipSelected(false)} />
            <Chip label="Selected" selected={chipSelected} onPress={() => setChipSelected(true)} />
          </View>
        </GallerySection>

        <GallerySection title="PART CHIP">
          <View style={styles.rowGap}>
            <PartChip
              label="Left ventricle"
              selected={!partChipSelected}
              onPress={() => setPartChipSelected(false)}
            />
            <PartChip
              label="Right atrium"
              selected={partChipSelected}
              onPress={() => setPartChipSelected(true)}
            />
          </View>
        </GallerySection>

        <GallerySection title="PROGRESS BAR">
          <View style={styles.stackGap}>
            <ProgressBar progress={0.3} />
            <ProgressBar progress={0.75} />
          </View>
        </GallerySection>

        <GallerySection title="STAT TILE">
          <View style={styles.rowGap}>
            <StatTile icon="favorite" value="12" label="Lessons done" />
            <StatTile icon="local-fire-department" value="5" label="Day streak" />
          </View>
        </GallerySection>

        <GallerySection title="ICON BUTTON">
          <View style={styles.rowGap}>
            <IconButton
              name="close"
              selected={!iconButtonSelected}
              onPress={() => setIconButtonSelected(false)}
            />
            <IconButton
              name="check"
              selected={iconButtonSelected}
              onPress={() => setIconButtonSelected(true)}
            />
          </View>
        </GallerySection>

        <GallerySection title="SECTION HEADER">
          <View style={styles.stackGap}>
            <SectionHeader title="Organ systems" />
            <SectionHeader title="Continue learning" actionLabel="See all" onActionPress={() => {}} />
          </View>
        </GallerySection>

        <GallerySection title="ICON">
          <View style={styles.rowGap}>
            <Icon name="school" size={20} color={colors.text.secondary} />
            <Icon name="school" size={28} color={colors.primary.default} />
            <Icon name="school" size={20} color={colors.text.faint} />
          </View>
        </GallerySection>

        <GallerySection title="SHEET">
          <View style={styles.rowGap}>
            <Button label="Open light sheet" variant="ghost" onPress={() => setLightSheetOpen(true)} />
            <Button label="Open dark sheet" variant="ghost" onPress={() => setDarkSheetOpen(true)} />
          </View>
        </GallerySection>

        <DataLayerPanel />
      </ScrollView>

      <Sheet visible={lightSheetOpen} onClose={() => setLightSheetOpen(false)}>
        <Text style={textStyles.titleCard}>Light sheet</Text>
        <Text style={textStyles.bodySm}>Slides up over 240 ms, dismiss by tapping the backdrop.</Text>
      </Sheet>

      <Sheet visible={darkSheetOpen} onClose={() => setDarkSheetOpen(false)} variant="dark">
        <Text style={[textStyles.titleCard, styles.onDark]}>Dark sheet</Text>
        <Text style={[textStyles.bodySm, styles.onDarkMuted]}>Used over the AR camera view.</Text>
      </Sheet>
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
    gap: spacing[24],
  },
  heading: {
    color: colors.text.primary,
  },
  subheading: {
    color: colors.text.muted,
  },
  section: {
    gap: spacing[12],
  },
  sectionLabel: {
    color: colors.text.faint,
  },
  stackGap: {
    gap: spacing[12],
  },
  rowGap: {
    flexDirection: 'row',
    gap: spacing[12],
  },
  onDark: {
    color: colors.text.onDark,
  },
  onDarkMuted: {
    color: colors.dark.textMuted,
  },
});
