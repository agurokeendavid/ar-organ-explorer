import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataLayerPanel } from '../../dev/DataLayerPanel';
import { colors, spacing, textStyles } from '../../theme/tokens';

export function ProgressScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[textStyles.h2, styles.heading]}>Progress</Text>
          <Text style={[textStyles.bodySm, styles.body]}>
            Stat grid and badges land in M8.
          </Text>
        </View>

        {__DEV__ ? <DataLayerPanel /> : null}
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
    gap: spacing[24],
  },
  header: {
    gap: spacing[6],
  },
  heading: {
    color: colors.text.primary,
  },
  body: {
    color: colors.text.muted,
  },
});
