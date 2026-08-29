import { useState, useEffect, useCallback } from 'react';

export function useTimer(totalSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    let intervalId: number;
    if (isRunning && timeLeft > 0) {
      intervalId = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  const isDanger = timeLeft < 600;

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  
  const formattedTime = hours > 0 
    ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return { timeLeft, isRunning, isDanger, start, pause, reset, formattedTime };
}
