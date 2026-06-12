import { useState } from 'react';
import { useRoadmap } from './state/useRoadmap';
import { Header } from './components/Header';
import { ChapterNav } from './components/ChapterNav';
import { ChapterView } from './components/ChapterView';
import { LevelUpToast } from './components/LevelUpToast';
import type { Roadmap } from './types';

/** 最初の未完了クエストがある章を初期表示にする（再訪時に続きから始められる） */
function findCurrentPhaseId(roadmap: Roadmap): string {
  const inProgress = roadmap.phases.find((p) => p.tasks.some((t) => t.status === 'todo'));
  return (inProgress ?? roadmap.phases[0]).id;
}

export default function App() {
  const { roadmap, dispatch, doneCount, totalCount, level, levelUp, clearLevelUp } = useRoadmap();
  const [selectedId, setSelectedId] = useState(() => findCurrentPhaseId(roadmap));

  const selectedPhase =
    roadmap.phases.find((p) => p.id === selectedId) ?? roadmap.phases[0];

  const handleReset = () => {
    if (
      window.confirm(
        '冒険の書を消して、はじめからやり直しますか？\n（チェック状況・追加クエスト・メモはすべて消えます）',
      )
    ) {
      dispatch({ type: 'RESET_ALL' });
    }
  };

  return (
    <div className="app">
      <Header level={level} done={doneCount} total={totalCount} onReset={handleReset} />
      <ChapterNav phases={roadmap.phases} selectedId={selectedPhase.id} onSelect={setSelectedId} />
      <ChapterView key={selectedPhase.id} phase={selectedPhase} dispatch={dispatch} />
      <footer className="app__footer">
        <p>📖 進み具合は この端末の「冒険の書」に 自動で きろくされる</p>
      </footer>
      {levelUp !== null && <LevelUpToast level={levelUp} onClose={clearLevelUp} />}
    </div>
  );
}
