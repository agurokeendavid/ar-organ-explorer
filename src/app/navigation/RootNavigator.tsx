import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { RootStackParamList } from './types';
import { ARScanScreen } from '../../screens/ARScan/ARScanScreen';
import { LessonScreen } from '../../screens/Lesson/LessonScreen';
import { OrganDetailScreen } from '../../screens/OrganDetail/OrganDetailScreen';
import { QuizScreen } from '../../screens/Quiz/QuizScreen';
import { TutorScreen } from '../../screens/Tutor/TutorScreen';
import { ViewerScreen } from '../../screens/Viewer/ViewerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Lesson" component={LessonScreen} />
      <Stack.Screen name="OrganDetail" component={OrganDetailScreen} />
      <Stack.Screen name="ARScan" component={ARScanScreen} />
      <Stack.Screen name="Viewer" component={ViewerScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Tutor" component={TutorScreen} />
    </Stack.Navigator>
  );
}
