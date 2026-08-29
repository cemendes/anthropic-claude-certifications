import { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';

interface Props {
  totalSeconds: number;
  onTimeUp: () => void;
}

export const ExamTimer: React.FC<Props> = ({ totalSeconds, onTimeUp }) => {
  const { timeLeft, isDanger, start, formattedTime } = useTimer(totalSeconds);

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium tabular-nums font-mono
      ${isDanger ? 'border-incorrect/30 bg-incorrect/10 text-incorrect animate-pulse' : 'border-outline-variant bg-card-2 text-on-surface-variant'}
    `}>
      <span className="material-symbols-outlined text-[18px]">timer</span>
      {formattedTime}
    </div>
  );
};
