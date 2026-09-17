import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ComponentGallery } from '../../dev/ComponentGallery';
import { colors, spacing, textStyles } from '../../theme/tokens';

export type TabParamList = {
  HomeTab: undefined;
  LessonsTab: undefined;
  ARTab: undefined;
  QuizTab: undefined;
  MeTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function PlaceholderScreen({ label }: { label: string }) {
  return (
    <View style={styles.screen}>
      <Text style={[textStyles.h1, styles.heading]}>{label}</Text>
      <Text style={[textStyles.body, styles.body]}>Placeholder — milestone content lands in M3+.</Text>
    </View>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={ComponentGallery} />
      <Tab.Screen name="LessonsTab">{() => <PlaceholderScreen label="Lessons" />}</Tab.Screen>
      <Tab.Screen name="ARTab">{() => <PlaceholderScreen label="AR" />}</Tab.Screen>
      <Tab.Screen name="QuizTab">{() => <PlaceholderScreen label="Quiz" />}</Tab.Screen>
      <Tab.Screen name="MeTab">{() => <PlaceholderScreen label="Progress" />}</Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[8],
    paddingHorizontal: spacing[24],
    backgroundColor: colors.bg.app,
  },
  heading: {
    color: colors.text.primary,
  },
  body: {
    color: colors.text.body,
    textAlign: 'center',
  },
});
