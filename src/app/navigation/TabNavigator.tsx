import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../components/Icon';
import { HomeScreen } from '../../screens/Home/HomeScreen';
import { LessonsScreen } from '../../screens/Lessons/LessonsScreen';
import { ProgressScreen } from '../../screens/Progress/ProgressScreen';
import { colors, textStyles } from '../../theme/tokens';
import { useActiveOrgan } from '../providers/ActiveOrganProvider';
import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function NoScreen() {
  return null;
}

function renderHomeIcon({ color }: { color: string }) {
  return <Icon name="home" size={24} color={color} />;
}

function renderLessonsIcon({ color }: { color: string }) {
  return <Icon name="menu-book" size={24} color={color} />;
}

function renderArIcon({ color }: { color: string }) {
  return <Icon name="view-in-ar" size={24} color={color} />;
}

function renderQuizIcon({ color }: { color: string }) {
  return <Icon name="quiz" size={24} color={color} />;
}

function renderMeIcon({ color }: { color: string }) {
  return <Icon name="person" size={24} color={color} />;
}

export function TabNavigator() {
  const insets = useSafeAreaInsets();
  const { activeOrganId } = useActiveOrgan();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.default,
        tabBarInactiveTintColor: colors.text.faint,
        tabBarLabelStyle: textStyles.tab,
        tabBarStyle: {
          height: 62 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: colors.surface.default,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home', tabBarIcon: renderHomeIcon }}
      />
      <Tab.Screen
        name="LessonsTab"
        component={LessonsScreen}
        options={{ tabBarLabel: 'Lessons', tabBarIcon: renderLessonsIcon }}
      />
      <Tab.Screen
        name="ARTab"
        component={NoScreen}
        options={{ tabBarLabel: 'AR', tabBarIcon: renderArIcon }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            rootNavigation.navigate('ARScan', { organId: activeOrganId });
          },
        }}
      />
      <Tab.Screen
        name="QuizTab"
        component={NoScreen}
        options={{ tabBarLabel: 'Quiz', tabBarIcon: renderQuizIcon }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            rootNavigation.navigate('Quiz', { organId: activeOrganId });
          },
        }}
      />
      <Tab.Screen
        name="MeTab"
        component={ProgressScreen}
        options={{ tabBarLabel: 'Me', tabBarIcon: renderMeIcon }}
      />
    </Tab.Navigator>
  );
}
