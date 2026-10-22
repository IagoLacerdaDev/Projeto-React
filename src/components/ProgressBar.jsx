export function ProgressBar({ value, label = 'Progresso da Tarefa' }) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-percentage">{safeValue}%</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="progress-fill"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}