import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
      <Text style={styles.heading}>{label}</Text>
      <Text style={styles.body}>Body Sans 3 — M0 placeholder, milestone content lands in M3+.</Text>
    </View>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab">{() => <PlaceholderScreen label="Home" />}</Tab.Screen>
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
    gap: 8,
    paddingHorizontal: 24,
  },
  heading: {
    fontFamily: 'BricolageGrotesque-ExtraBold',
    fontSize: 26,
    color: '#23262e',
  },
  body: {
    fontFamily: 'SourceSans3-Regular',
    fontSize: 16,
    color: '#3d424e',
    textAlign: 'center',
  },
});
