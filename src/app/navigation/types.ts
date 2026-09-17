import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { OrganId } from '../../data/content';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  Lesson: { organId: OrganId; sectionIndex?: number };
  OrganDetail: { organId: OrganId; partName?: string };
  ARScan: { organId: OrganId };
  Viewer: { organId: OrganId; partName?: string };
  Quiz: { organId: OrganId };
  Results: { organId: OrganId; answers: (number | null)[]; newBadgeKeys: string[] };
  Tutor: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  LessonsTab: undefined;
  ARTab: undefined;
  QuizTab: undefined;
  MeTab: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
