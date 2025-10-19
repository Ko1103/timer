'use client';

import { CountdownTimer } from '@/components/countdown-timer';
import { Button } from '@/components/ui/button';
import { useTimer } from '@/hooks/use-timer';
import { PlayIcon } from 'lucide-react';
import { TimerLayout } from './layout';
import { TimerFooter } from './timer-footer';

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
    <TimerLayout className="flex flex-col gap-4">
      <div className="text-2xl font-bold text-muted-foreground mt-8 px-2">
        気分で選ぶ
      </div>
      {/* Button Section */}
      <div className="space-y-4 border-t border-border px-4">
        <div className="flex flex-col gap-3 ">
          <Button
            className="h-14 w-full text-lg bg-emerald-300 justify-left"
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
            やる気ない： 5-15-30分セット
          </Button>
          <Button
            className="h-14 w-full text-lg justify-left bg-emerald-500"
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
            いつも通り： 30-30-30分セット
          </Button>
          <Button
            className="h-14 w-full text-lg justify-left bg-emerald-700"
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
            やる気満々： 30-60-60分セット
          </Button>
          <Button
            className="h-14 w-full text-lg justify-left bg-emerald-900"
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
            禅{'　　　　'}：60-60-60分セット
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-4 flex items-center justify-center gap-4 flex-wrap px-2">
        <Button
          className="text-muted bg-emerald-300 rounded-full bg"
          onClick={() => {
            timer.setTimer([{ mode: 'focus', minutes: 15 }]);
          }}
        >
          15:00 <PlayIcon className="size-4" />
        </Button>
        <Button
          className="text-muted bg-emerald-500 rounded-full"
          onClick={() => {
            timer.setTimer([{ mode: 'focus', minutes: 30 }]);
          }}
        >
          30:00 <PlayIcon className="size-4" />
        </Button>
        <Button
          className="text-muted bg-emerald-700 rounded-full"
          onClick={() => {
            timer.setTimer([{ mode: 'focus', minutes: 60 }]);
          }}
        >
          60:00 <PlayIcon className="size-4" />
        </Button>
        <Button
          className="text-muted bg-emerald-900 rounded-full"
          onClick={() => {
            timer.setTimer([{ mode: 'focus', minutes: 90 }]);
          }}
        >
          90:00 <PlayIcon className="size-4" />
        </Button>
      </div>

      <TimerFooter className="flex justify-between text-muted-foreground">
        <div>今日の合計: {timer.totalMinutes / 60}時間</div>
      </TimerFooter>
    </TimerLayout>
  );
}
