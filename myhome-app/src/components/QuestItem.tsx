import { useState } from 'react';
import type { Task } from '../types';
import { QuestForm } from './QuestForm';

interface QuestItemProps {
  task: Task;
  onToggle: () => void;
  onEdit: (title: string, description?: string) => void;
  onDelete: () => void;
  onMemoChange: (memo: string) => void;
}

export function QuestItem({ task, onToggle, onEdit, onDelete, onMemoChange }: QuestItemProps) {
  const [editing, setEditing] = useState(false);
  const [memoOpen, setMemoOpen] = useState(false);

  if (editing) {
    return (
      <li className="quest quest--editing">
        <QuestForm
          initialTitle={task.title}
          initialDescription={task.description ?? ''}
          submitLabel="保存する"
          onSubmit={(title, description) => {
            onEdit(title, description);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  const done = task.status === 'done';

  return (
    <li className={`quest${done ? ' quest--done' : ''}`}>
      <div className="quest__row">
        <label className="quest__check">
          <input type="checkbox" checked={done} onChange={onToggle} />
          <span className="quest__box" aria-hidden="true">
            {done ? '✓' : ''}
          </span>
        </label>
        <div className="quest__body">
          <span className="quest__title">{task.title}</span>
          {task.description !== undefined && (
            <span className="quest__desc">{task.description}</span>
          )}
          {done && <span className="quest__clear">クエストクリア！</span>}
        </div>
        <div className="quest__actions">
          <button
            type="button"
            className={`quest__icon-btn${task.memo !== '' ? ' quest__icon-btn--active' : ''}`}
            onClick={() => setMemoOpen(!memoOpen)}
            aria-label="メモを開く"
            title="メモ"
          >
            📝
          </button>
          <button
            type="button"
            className="quest__icon-btn"
            onClick={() => setEditing(true)}
            aria-label="編集する"
            title="編集"
          >
            ✏️
          </button>
          <button
            type="button"
            className="quest__icon-btn"
            onClick={() => {
              if (window.confirm(`「${task.title}」を削除しますか？`)) onDelete();
            }}
            aria-label="削除する"
            title="削除"
          >
            🗑️
          </button>
        </div>
      </div>
      {memoOpen && (
        <textarea
          className="quest__memo"
          value={task.memo}
          onChange={(e) => onMemoChange(e.target.value)}
          placeholder="このクエストのメモ（担当者の連絡先、確認結果など）"
          rows={3}
        />
      )}
    </li>
  );
}
