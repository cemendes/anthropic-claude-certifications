interface Props {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<Props> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100) || 0;
  
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-end text-sm text-on-surface-variant font-medium">
        <span>Question {Math.min(current + 1, total)} of {total}</span>
        <span>{percentage}% Complete</span>
      </div>
      <div className="h-1 w-full bg-card-1 rounded-full overflow-hidden border border-border">
        <div 
          className="h-full bg-primary-container rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
