import type { Phase, Roadmap, Task } from '../types';
import { createInitialRoadmap } from '../data/presetRoadmap';

export type RoadmapAction =
  | { type: 'TOGGLE_TASK'; phaseId: string; taskId: string }
  | { type: 'ADD_TASK'; phaseId: string; title: string; description?: string }
  | { type: 'EDIT_TASK'; phaseId: string; taskId: string; title: string; description?: string }
  | { type: 'DELETE_TASK'; phaseId: string; taskId: string }
  | { type: 'SET_TASK_MEMO'; phaseId: string; taskId: string; memo: string }
  | { type: 'SET_PHASE_MEMO'; phaseId: string; memo: string }
  | { type: 'RESET_ALL' };

function updatePhase(roadmap: Roadmap, phaseId: string, update: (phase: Phase) => Phase): Roadmap {
  return {
    ...roadmap,
    updatedAt: new Date().toISOString(),
    phases: roadmap.phases.map((p) => (p.id === phaseId ? update(p) : p)),
  };
}

function updateTask(phase: Phase, taskId: string, update: (task: Task) => Task): Phase {
  return { ...phase, tasks: phase.tasks.map((t) => (t.id === taskId ? update(t) : t)) };
}

export function roadmapReducer(state: Roadmap, action: RoadmapAction): Roadmap {
  switch (action.type) {
    case 'TOGGLE_TASK':
      return updatePhase(state, action.phaseId, (phase) =>
        updateTask(phase, action.taskId, (task) =>
          task.status === 'done'
            ? { ...task, status: 'todo', completedAt: undefined }
            : { ...task, status: 'done', completedAt: new Date().toISOString() },
        ),
      );
    case 'ADD_TASK': {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.title,
        description: action.description,
        status: 'todo',
        memo: '',
        isCustom: true,
        createdAt: new Date().toISOString(),
      };
      return updatePhase(state, action.phaseId, (phase) => ({
        ...phase,
        tasks: [...phase.tasks, newTask],
      }));
    }
    case 'EDIT_TASK':
      return updatePhase(state, action.phaseId, (phase) =>
        updateTask(phase, action.taskId, (task) => ({
          ...task,
          title: action.title,
          description: action.description,
        })),
      );
    case 'DELETE_TASK':
      return updatePhase(state, action.phaseId, (phase) => ({
        ...phase,
        tasks: phase.tasks.filter((t) => t.id !== action.taskId),
      }));
    case 'SET_TASK_MEMO':
      return updatePhase(state, action.phaseId, (phase) =>
        updateTask(phase, action.taskId, (task) => ({ ...task, memo: action.memo })),
      );
    case 'SET_PHASE_MEMO':
      return updatePhase(state, action.phaseId, (phase) => ({ ...phase, memo: action.memo }));
    case 'RESET_ALL':
      return createInitialRoadmap();
  }
}

/** 完了クエスト数からレベルを算出（3クエストごとにレベルアップ） */
export function calcLevel(doneCount: number): number {
  return 1 + Math.floor(doneCount / 3);
}

export function countTasks(roadmap: Roadmap): { done: number; total: number } {
  let done = 0;
  let total = 0;
  for (const phase of roadmap.phases) {
    total += phase.tasks.length;
    done += phase.tasks.filter((t) => t.status === 'done').length;
  }
  return { done, total };
}
