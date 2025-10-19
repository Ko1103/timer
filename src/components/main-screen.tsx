'use client';

import { CountdownTimer } from '@/components/countdown-timer';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/hooks/use-timer';
import { PlayIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TimerLayout } from './layout';
import { TimerFooter } from './timer-footer';

export function MainScreen() {
  const { t } = useTranslation();
  const timer = useTimer();
  const first = timer.timers[0] ?? null;

  if (first) {
    return (
      <CountdownTimer
        timer={first}
        nextTimer={timer.timers[1]}
        onComplete={timer.onFinish}
        onCancel={timer.cancel}
        onSkip={timer.skipRest}
      />
    );
  }

  return (
    <TimerLayout className="flex flex-col gap-4">
      <div className="text-xl font-bold text-muted-foreground mt-12 px-2 text-center">
        {t('mainScreen.moodTitle')}
      </div>
      {/* Button Section */}
      <div className="grid grid-cols-1 gap-4 mx-auto">
        <Button
          className="text-lg bg-emerald-300 justify-left rounded-full text-base h-10"
          onClick={() => {
            timer.setTimer([
              { mode: 'focus', minutes: 5 },
              { mode: 'rest', minutes: 5 },
              { mode: 'focus', minutes: 15 },
              { mode: 'rest', minutes: 5 },
              { mode: 'focus', minutes: 30 },
            ]);
          }}
        >
          {t('mainScreen.lazy')}
        </Button>
        <Button
          className="text-lg justify-left bg-emerald-500 rounded-full text-base h-10"
          onClick={() => {
            timer.setTimer([
              { mode: 'focus', minutes: 30 },
              { mode: 'rest', minutes: 5 },
              { mode: 'focus', minutes: 30 },
              { mode: 'rest', minutes: 5 },
              { mode: 'focus', minutes: 30 },
            ]);
          }}
        >
          {t('mainScreen.steady')}
        </Button>
        <Button
          className="text-lg justify-left bg-emerald-700 rounded-full text-base h-10"
          onClick={() => {
            timer.setTimer([
              { mode: 'focus', minutes: 30 },
              { mode: 'rest', minutes: 5 },
              { mode: 'focus', minutes: 60 },
              { mode: 'rest', minutes: 10 },
              { mode: 'focus', minutes: 60 },
            ]);
          }}
        >
          {t('mainScreen.focus')}
        </Button>
        <Button
          className="text-lg justify-left bg-emerald-900 rounded-full text-base h-10"
          onClick={() => {
            timer.setTimer([
              { mode: 'focus', minutes: 60 },
              { mode: 'rest', minutes: 5 },
              { mode: 'focus', minutes: 60 },
              { mode: 'rest', minutes: 5 },
              { mode: 'focus', minutes: 60 },
            ]);
          }}
        >
          {t('mainScreen.zen')}
        </Button>
      </div>

      <div className="text-xl font-bold text-muted-foreground mt-8 px-2 text-center">
        {t('mainScreen.timeTitle')}
      </div>
      <div className="text-muted-foreground text-base font-semibold text-center">
        {t('mainScreen.focusTitle')}
      </div>
      <div className="grid grid-cols-2 gap-4 w-8/10 mx-auto">
        <Button
          className="text-muted bg-emerald-300 rounded-full text-base"
          onClick={() => {
            timer.setTimer([
              { mode: 'focus', minutes: 15 },
              { mode: 'rest', minutes: 5 },
            ]);
          }}
        >
          15:00 <PlayIcon className="size-4" />
        </Button>
        <Button
          className="text-muted bg-emerald-500 rounded-full text-base"
          onClick={() => {
            timer.setTimer([
              { mode: 'focus', minutes: 30 },
              { mode: 'rest', minutes: 5 },
            ]);
          }}
        >
          30:00 <PlayIcon className="size-4" />
        </Button>
        <Button
          className="text-muted bg-emerald-700 rounded-full text-base"
          onClick={() => {
            timer.setTimer([
              { mode: 'focus', minutes: 60 },
              { mode: 'rest', minutes: 10 },
            ]);
          }}
        >
          60:00 <PlayIcon className="size-4" />
        </Button>
        <Button
          className="text-muted bg-emerald-900 rounded-full text-base"
          onClick={() => {
            timer.setTimer([
              { mode: 'focus', minutes: 90 },
              { mode: 'rest', minutes: 15 },
            ]);
          }}
        >
          90:00 <PlayIcon className="size-4" />
        </Button>
      </div>

      <TimerFooter className="flex justify-between text-muted-foreground">
        {/* 何時間何分 */}
        <div>
          {t('mainScreen.footer.total', {
            hours: Math.floor(timer.totalMinutes / 60),
            minutes: timer.totalMinutes % 60,
          })}
        </div>
      </TimerFooter>
    </TimerLayout>
  );
}
