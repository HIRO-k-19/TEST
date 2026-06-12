import { useEffect } from 'react';

interface LevelUpToastProps {
  level: number;
  onClose: () => void;
}

export function LevelUpToast({ level, onClose }: LevelUpToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 2600);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="levelup" role="status" onClick={onClose}>
      <div className="levelup__window window">
        <p className="levelup__sparkle" aria-hidden="true">
          ✦ ✦ ✦
        </p>
        <p className="levelup__text">レベルが あがった！</p>
        <p className="levelup__level">勇者は Lv.{level} になった</p>
      </div>
    </div>
  );
}
