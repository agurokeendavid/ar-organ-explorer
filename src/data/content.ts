import raw from '../../data/content.json';

export type OrganId = 'heart' | 'lungs' | 'digestive' | 'brain' | 'kidneys' | 'skeleton';

export type Organ = {
  id: OrganId;
  name: string;
  system: string;
  model: string;
  blurb: string;
  lessonTitle: string;
  totalLessons: number;
  stats: { value: string; label: string }[];
  parts: { name: string; description: string; node?: string }[];
};

export type Section = {
  title: string;
  body: string;
  keyword: string;
  definition: string;
  figure: string;
};

export type Question = {
  q: string;
  options: string[];
  answer: number;
  why: string;
};

export type Badge = { key: string; name: string; icon: string };
export type LockedBadge = { key: string; name: string; how: string };

export type Content = {
  organs: Organ[];
  sections: Record<string, Section[]>;
  quiz: Record<string, Question[]>;
  tutor: { q: string; a: string }[];
  badges: { earned: Badge[]; locked: LockedBadge[] };
  demoProgress?: Record<string, number>;
};

export const content = raw as unknown as Content;

export function getOrgan(id: string): Organ | undefined {
  return content.organs.find(organ => organ.id === id);
}

export function getSections(organId: string): Section[] {
  return content.sections[organId] ?? [];
}

export function getQuestions(organId: string): Question[] {
  return content.quiz[organId] ?? [];
}
