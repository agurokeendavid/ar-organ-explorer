import { content, Organ, OrganId } from '../../data/content';
import { getAllProgress } from '../../data/repositories/lessonProgress';
import { getContinueBarPercent, getContinueRatio } from '../../data/selectors';

export type OrganProgress = {
  organ: Organ;
  completed: number;
  total: number;
  ratio: number;
  percent: number;
};

export function getOrganProgressList(): OrganProgress[] {
  const progressRows = getAllProgress();

  return content.organs.map(organ => {
    const { completed, total, ratio } = getContinueRatio(
      organ.id,
      progressRows,
      organ.totalLessons,
    );
    return { organ, completed, total, ratio, percent: getContinueBarPercent(ratio) };
  });
}

export function getOrganProgress(organId: OrganId): OrganProgress | undefined {
  return getOrganProgressList().find(entry => entry.organ.id === organId);
}
