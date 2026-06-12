import type { Phase } from '../types';

interface ChapterNavProps {
  phases: Phase[];
  selectedId: string;
  onSelect: (phaseId: string) => void;
}

export function ChapterNav({ phases, selectedId, onSelect }: ChapterNavProps) {
  return (
    <nav className="chapter-nav" aria-label="章の選択">
      {phases.map((phase) => {
        const done = phase.tasks.filter((t) => t.status === 'done').length;
        const total = phase.tasks.length;
        const cleared = total > 0 && done === total;
        const selected = phase.id === selectedId;
        return (
          <button
            key={phase.id}
            type="button"
            className={`chapter-nav__chip${selected ? ' chapter-nav__chip--selected' : ''}`}
            onClick={() => onSelect(phase.id)}
            aria-current={selected ? 'true' : undefined}
          >
            <span className="chapter-nav__cursor" aria-hidden="true">
              {selected ? '▶' : ' '}
            </span>
            <span className="chapter-nav__emoji" aria-hidden="true">
              {phase.emoji}
            </span>
            <span className="chapter-nav__name">{phase.name.split(' ')[0]}</span>
            <span className="chapter-nav__count">
              {cleared ? '👑' : `${done}/${total}`}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
