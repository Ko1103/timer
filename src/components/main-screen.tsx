'use client';

import { CountdownTimer } from '@/components/countdown-timer';
import { useTimer } from '@/hooks/use-timer';
import { MainView } from './main-view';

export function MainScreen() {
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
    <MainView totalMinutes={timer.totalMinutes} setTimer={timer.setTimer} />
  );
}
