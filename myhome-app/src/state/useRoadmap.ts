import { useEffect, useReducer, useRef, useState } from 'react';
import type { Roadmap } from '../types';
import { loadRoadmap, saveRoadmap } from '../storage';
import { calcLevel, countTasks, roadmapReducer, type RoadmapAction } from './roadmapReducer';

export interface UseRoadmapResult {
  roadmap: Roadmap;
  dispatch: React.Dispatch<RoadmapAction>;
  doneCount: number;
  totalCount: number;
  level: number;
  /** レベルアップ直後に新レベルが入る（演出表示用）。表示後 clearLevelUp で消す */
  levelUp: number | null;
  clearLevelUp: () => void;
}

export function useRoadmap(): UseRoadmapResult {
  const [roadmap, dispatch] = useReducer(roadmapReducer, undefined, loadRoadmap);
  const { done, total } = countTasks(roadmap);
  const level = calcLevel(done);

  const prevLevelRef = useRef(level);
  const [levelUp, setLevelUp] = useState<number | null>(null);

  useEffect(() => {
    saveRoadmap(roadmap);
  }, [roadmap]);

  useEffect(() => {
    if (level > prevLevelRef.current) {
      setLevelUp(level);
    }
    prevLevelRef.current = level;
  }, [level]);

  return {
    roadmap,
    dispatch,
    doneCount: done,
    totalCount: total,
    level,
    levelUp,
    clearLevelUp: () => setLevelUp(null),
  };
}
