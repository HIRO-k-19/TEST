import { useState } from 'react';
import type { Phase } from '../types';
import type { RoadmapAction } from '../state/roadmapReducer';
import { ExpBar } from './ExpBar';
import { QuestItem } from './QuestItem';
import { QuestForm } from './QuestForm';

interface ChapterViewProps {
  phase: Phase;
  dispatch: React.Dispatch<RoadmapAction>;
}

export function ChapterView({ phase, dispatch }: ChapterViewProps) {
  const [adding, setAdding] = useState(false);
  const done = phase.tasks.filter((t) => t.status === 'done').length;
  const total = phase.tasks.length;
  const cleared = total > 0 && done === total;

  return (
    <section className="chapter window">
      <header className="chapter__header">
        <h2 className="chapter__title">
          <span aria-hidden="true">{phase.emoji}</span> {phase.name}
          {cleared && <span className="chapter__crown"> 👑</span>}
        </h2>
        <p className="chapter__desc">{phase.description}</p>
        <ExpBar done={done} total={total} variant="green" />
      </header>

      <ul className="chapter__quests">
        {phase.tasks.map((task) => (
          <QuestItem
            key={task.id}
            task={task}
            onToggle={() => dispatch({ type: 'TOGGLE_TASK', phaseId: phase.id, taskId: task.id })}
            onEdit={(title, description) =>
              dispatch({ type: 'EDIT_TASK', phaseId: phase.id, taskId: task.id, title, description })
            }
            onDelete={() => dispatch({ type: 'DELETE_TASK', phaseId: phase.id, taskId: task.id })}
            onMemoChange={(memo) =>
              dispatch({ type: 'SET_TASK_MEMO', phaseId: phase.id, taskId: task.id, memo })
            }
          />
        ))}
      </ul>

      {adding ? (
        <QuestForm
          submitLabel="クエストを追加"
          onSubmit={(title, description) => {
            dispatch({ type: 'ADD_TASK', phaseId: phase.id, title, description });
            setAdding(false);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button type="button" className="btn btn--add" onClick={() => setAdding(true)}>
          ＋ クエストを追加する
        </button>
      )}

      <div className="chapter__memo">
        <h3 className="chapter__memo-title">📜 この章のメモ</h3>
        <textarea
          className="chapter__memo-input"
          value={phase.memo}
          onChange={(e) => dispatch({ type: 'SET_PHASE_MEMO', phaseId: phase.id, memo: e.target.value })}
          placeholder="この章に関するメモ（気づき・宿題・比較メモなど）"
          rows={3}
        />
      </div>
    </section>
  );
}
