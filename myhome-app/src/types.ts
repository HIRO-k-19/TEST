export type TaskStatus = 'todo' | 'done';

/** クエスト（家づくりの1タスク） */
export interface Task {
  id: string;
  title: string;
  /** 実務上の補足説明（例: 事前審査は複数行に出すと比較しやすい） */
  description?: string;
  status: TaskStatus;
  memo: string;
  /** プリセット由来 false / ユーザー追加 true */
  isCustom: boolean;
  createdAt: string;
  completedAt?: string;
}

/** 章（家づくりのフェーズ） */
export interface Phase {
  id: string;
  name: string;
  description: string;
  emoji: string;
  tasks: Task[];
  memo: string;
}

/** 冒険の書（全データ） */
export interface Roadmap {
  schemaVersion: 1;
  phases: Phase[];
  updatedAt: string;
}
