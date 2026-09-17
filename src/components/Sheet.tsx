import React, { ReactNode, useEffect } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colors, elevation, motion, radius, spacing } from '../theme/tokens';

export type SheetProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: 'light' | 'dark';
};

export function Sheet({ visible, onClose, children, variant = 'light' }: SheetProps) {
  const translateY = useSharedValue(240);

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : 240, { duration: motion.sheetInOut.duration });
  }, [visible, translateY]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View
        style={[
          styles.panel,
          variant === 'dark' ? styles.panelDark : styles.panelLight,
          panelStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
    padding: spacing[16],
    elevation: elevation.sheetOverCamera,
  },
  panelLight: {
    backgroundColor: colors.surface.default,
  },
  panelDark: {
    backgroundColor: colors.dark.surface,
  },
});
