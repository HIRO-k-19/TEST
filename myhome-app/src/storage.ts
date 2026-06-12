import type { Roadmap } from './types';
import { createInitialRoadmap } from './data/presetRoadmap';

const STORAGE_KEY = 'myhome-app:roadmap:v1';

function isValidRoadmap(value: unknown): value is Roadmap {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Partial<Roadmap>;
  return v.schemaVersion === 1 && Array.isArray(v.phases);
}

export function loadRoadmap(): Roadmap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return createInitialRoadmap();
    const parsed: unknown = JSON.parse(raw);
    if (!isValidRoadmap(parsed)) return createInitialRoadmap();
    return parsed;
  } catch {
    return createInitialRoadmap();
  }
}

export function saveRoadmap(roadmap: Roadmap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roadmap));
  } catch {
    // ストレージ満杯・プライベートモード等では保存を諦める（アプリは動き続ける）
  }
}
