interface ExpBarProps {
  done: number;
  total: number;
  variant?: 'gold' | 'green';
}

export function ExpBar({ done, total, variant = 'gold' }: ExpBarProps) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div
      className={`exp-bar exp-bar--${variant}`}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="exp-bar__fill" style={{ width: `${percent}%` }} />
      <span className="exp-bar__label">
        {done}/{total}（{percent}%）
      </span>
    </div>
  );
}
