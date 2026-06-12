import { ExpBar } from './ExpBar';

interface HeaderProps {
  level: number;
  done: number;
  total: number;
  onReset: () => void;
}

export function Header({ level, done, total, onReset }: HeaderProps) {
  return (
    <header className="header window">
      <div className="header__top">
        <h1 className="header__title">⚔️ 家づくりクエスト</h1>
        <button type="button" className="header__reset" onClick={onReset}>
          冒険の書を消す
        </button>
      </div>
      <div className="header__status">
        <span className="header__level">勇者 Lv.{level}</span>
        <ExpBar done={done} total={total} />
      </div>
    </header>
  );
}
