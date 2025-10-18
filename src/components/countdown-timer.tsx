'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCallback, useEffect, useState } from 'react';

interface CountdownTimerProps {
  title: 'Rest' | 'Focus';
  initialSeconds: number;
  onComplete?: () => void;
  onCancel?: () => void;
}

export function CountdownTimer({
  title,
  initialSeconds,
  onComplete,
  onCancel,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft <= 0 && onComplete) {
      onComplete();
    }

    return interval ? () => clearInterval(interval) : undefined;
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  const handleCancel = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
    onCancel?.();
  };

  const progressRatio = initialSeconds
    ? title === 'Focus'
      ? timeLeft / initialSeconds
      : (initialSeconds - timeLeft) / initialSeconds
    : 0;

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset =
    circumference * (1 - Math.min(Math.max(progressRatio, 0), 1));

  return (
    <Card className="w-full max-w-md mx-auto p-8 bg-card">
      <div className="flex flex-col items-center gap-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
        </div>

        {/* Timer Display */}
        <div className="relative w-full aspect-square max-w-[280px]">
          {/* Progress Circle */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted opacity-20"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${circumference}`}
              strokeDashoffset={`${strokeDashoffset}`}
              strokeLinecap="round"
              className={`transition-all duration-1000 ease-linear ${
                title === 'Focus' ? 'text-blue-600' : 'text-emerald-600'
              }`}
            />
          </svg>

          {/* Time Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-4xl font-bold tracking-wider text-foreground tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Cancel Button */}
        <Button
          onClick={handleCancel}
          variant="outline"
          size="lg"
          className="w-full max-w-[200px] font-medium bg-transparent"
        >
          キャンセル
        </Button>
      </div>
    </Card>
  );
}
