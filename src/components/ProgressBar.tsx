import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../theme/tokens';

export type ProgressBarProps = {
  progress: number;
  height?: number;
};

export function ProgressBar({ progress, height = 8 }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.track, { height }]}>
      <View style={[styles.fill, { height, width: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: radius.pill,
    backgroundColor: colors.track,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radius.pill,
    backgroundColor: colors.primary.default,
  },
});
