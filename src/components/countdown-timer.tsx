'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Timer } from '@/hooks/use-timer';
import { cn } from '@/lib/utils';
import {
  CircleDotIcon,
  CoffeeIcon,
  PauseIcon,
  PlayIcon,
  SkipForwardIcon,
  XIcon,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const noop = () => {};

export const CountdownTimer: React.FC<{
  timer: Timer;
  nextTimer?: Timer;
  onComplete: () => void;
  onCancel: () => void;
  onSkip: () => void;
}> = ({ timer, onComplete, onCancel, nextTimer, onSkip }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(timer.minutes * 60);
  const [isRunning, setIsRunning] = useState(true);
  const isFocus = timer.mode === 'focus';

  useEffect(() => {
    setTimeLeft(timer.minutes * 60);
    setIsRunning(timer.mode !== 'rest');
  }, [timer.minutes, timer.mode]);

  useEffect(() => {
    if (!isRunning) {
      return noop;
    }

    if (timeLeft <= 0) {
      setIsRunning(false);
      onComplete();
      return noop;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 60;
        return next > 0 ? next : 0;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  const handleCancel = () => {
    onCancel();
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div
      className={cn(
        'flex flex-col min-h-screen w-full max-w-md mx-auto',
        isFocus
          ? 'bg-muted text-muted-foreground'
          : 'bg-emerald-500 text-white',
      )}
    >
      {/* ヘッダー */}
      <div className="flex justify-between items-center p-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                'text-muted-foreground rounded-full ',
                isFocus ? 'text-muted-foreground' : 'text-white',
              )}
              onClick={handleCancel}
            >
              <XIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Cancel</TooltipContent>
        </Tooltip>

        {timer.mode === 'rest' && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  'rounded-full text-muted-foreground',
                  isFocus ? 'text-muted-foreground' : 'text-muted',
                )}
                onClick={onSkip}
              >
                <SkipForwardIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Skip</TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div
          className={cn(
            'text-center text-lg text-muted-foreground flex items-center gap-2 justify-center',
            isFocus ? 'text-muted-foreground' : 'text-muted',
          )}
        >
          {isFocus ? (
            <>
              <span>Focus</span>
              <CircleDotIcon className="size-6" />
            </>
          ) : (
            <>
              <span>Let&apos;s take a break</span>
              <CoffeeIcon className="size-6" />
            </>
          )}
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center gap-8">
            {/* Timer Display */}
            {/* Time Text */}
            <div className="flex items-center justify-center">
              <span
                className={cn(
                  'font-mono text-4xl font-bold tracking-wider text-foreground tabular-nums',
                  isFocus ? 'text-foreground' : 'text-muted',
                )}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button size="icon" className="rounded-full" onClick={handlePause}>
            {isRunning ? (
              <PauseIcon className="size-4" />
            ) : (
              <PlayIcon className="size-4" />
            )}
          </Button>
        </div>
      </div>

      <footer className="mt-auto w-full px-3 py-2">
        {nextTimer && (
          <div
            className={cn(
              'text-right text-sm',
              isFocus ? 'text-muted-foreground' : 'text-muted',
            )}
          >
            {nextTimer.mode === 'rest'
              ? t('nextMessage.rest', { minutes: nextTimer?.minutes })
              : t('nextMessage.focus', { minutes: nextTimer?.minutes })}
          </div>
        )}
      </footer>
    </div>
  );
};
