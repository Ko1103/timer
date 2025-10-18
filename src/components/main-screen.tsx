'use client';

import { CountdownTimer } from '@/components/countdown-timer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTimer } from '@/hooks/use-timer';
import { cn } from '@/lib/utils';
import { PlayIcon } from 'lucide-react';
import React, { useState } from 'react';

const TimerButton: React.FC<{
  minutes: number;
  type: 'focus' | 'rest';
  onClick: () => void;
}> = ({ minutes, type, onClick }) => {
  return (
    <Button
      onClick={onClick}
      size="sm"
      className={cn(
        'w-full text-lg font-semibold h-14 flex items-center justify-center gap-2',
        type === 'focus'
          ? 'bg-blue-600 hover:bg-blue-700'
          : 'bg-emerald-600 hover:bg-emerald-700',
      )}
    >
      <span className="text-2xl">{minutes}</span> minutes
      <PlayIcon className="size-4" />
    </Button>
  );
};

export function MainScreen() {
  const timer = useTimer();
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [goalHoursInput, setGoalHoursInput] = useState('1');

  const handleSaveGoal = () => {
    const parsedHours = Number(goalHoursInput);
    const normalized =
      Number.isFinite(parsedHours) && parsedHours >= 0 ? parsedHours : 0;

    setGoalHoursInput(String(normalized));
    timer.setGoal(normalized);
    setIsGoalDialogOpen(false);
  };

  const pad = (value: number) => value.toString().padStart(2, '0');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  };

  const formatGoalRemaining = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    // hours:minutes の形式に変換、両方とも２桁表示
    return `${pad(hours)}:${pad(minutes)}`;
  };

  const goalRemainingSeconds: number = timer.remainingGoalHours
    ? timer.remainingGoalHours * 3600
    : 0;

  const handleTimerComplete = () => {
    timer.onFinish();
  };

  const handleCancel = () => {
    timer.cancel();
  };

  if (timer.mode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <CountdownTimer
          title={timer.mode}
          initialSeconds={timer.minutes * 60}
          onComplete={handleTimerComplete}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md mx-auto p-8 bg-card">
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            {timer.goalHours === null ? (
              // Today's Work Time
              <div className="text-center space-y-2">
                <h2 className="text-lg font-medium text-muted-foreground">
                  {timer.totalMinutes === 0 ? ':' : "Today's Work Time:"}
                </h2>
                <div className="font-mono text-5xl font-bold tracking-wider text-foreground tabular-nums">
                  {formatTime(timer.totalMinutes * 60)}
                </div>
              </div>
            ) : (
              // Goal Remaining Time
              <div className="text-center space-y-2">
                <div className="font-mono text-4xl font-bold tracking-wider text-foreground tabular-nums">
                  {formatGoalRemaining(goalRemainingSeconds ?? 0)}
                </div>
                <span className="text-sm text-muted-foreground">
                  left until your goal
                </span>
              </div>
            )}
            <div className="text-center space-y-2">
              <Dialog
                open={isGoalDialogOpen}
                onOpenChange={setIsGoalDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>Set Goal</Button>
                </DialogTrigger>
                <DialogContent className="space-y-4">
                  <DialogHeader>
                    <DialogTitle>Set Daily Goal</DialogTitle>
                    <DialogDescription>
                      Focus hours you want to hit today.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Label htmlFor="goal-hours" className="text-sm font-medium">
                      Hours
                    </Label>
                    <Input
                      id="goal-hours"
                      type="number"
                      min="0"
                      value={goalHoursInput}
                      onChange={(event) =>
                        setGoalHoursInput(event.target.value)
                      }
                      inputMode="numeric"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSaveGoal}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground text-center">
              時間を設定
            </h3>
            <div className="flex gap-2 items-end">
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="hours"
                  className="text-xs text-muted-foreground"
                >
                  時間
                </Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="23"
                  value={customHours}
                  onChange={(e) => setCustomHours(e.target.value)}
                  className="text-center font-mono text-lg"
                  placeholder="00"
                />
              </div>
              <span className="text-2xl font-bold text-muted-foreground pb-2">
                :
              </span>
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="minutes"
                  className="text-xs text-muted-foreground"
                >
                  分
                </Label>
                <Input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(e.target.value)}
                  className="text-center font-mono text-lg"
                  placeholder="00"
                />
              </div>
              <span className="text-2xl font-bold text-muted-foreground pb-2">
                :
              </span>
              <div className="flex-1 space-y-1">
                <Label
                  htmlFor="seconds"
                  className="text-xs text-muted-foreground"
                >
                  秒
                </Label>
                <Input
                  id="seconds"
                  type="number"
                  min="0"
                  max="59"
                  value={customSeconds}
                  onChange={(e) => setCustomSeconds(e.target.value)}
                  className="text-center font-mono text-lg"
                  placeholder="00"
                />
              </div>
            </div>
            <Button
              onClick={handleStartCustomTimer}
              size="lg"
              className="w-full text-lg font-semibold h-12"
            >
              開始
            </Button>
          </div> */}

          {/* Button Section */}
          <div className="space-y-4 border-t border-border">
            <div className="text-center mt-4 text-lg font-medium text-muted-foreground">
              Focus
            </div>
            <div className="flex flex-col gap-3">
              <TimerButton
                minutes={15}
                type="focus"
                onClick={() => {
                  timer.setTimer([{ mode: 'focus', minutes: 15 }]);
                }}
              />
              <TimerButton
                minutes={30}
                type="focus"
                onClick={() => {
                  timer.setTimer([{ mode: 'focus', minutes: 30 }]);
                }}
              />
              <TimerButton
                minutes={60}
                type="focus"
                onClick={() => {
                  timer.setTimer([{ mode: 'focus', minutes: 60 }]);
                }}
              />
              <TimerButton
                minutes={90}
                type="focus"
                onClick={() => {
                  timer.setTimer([{ mode: 'focus', minutes: 90 }]);
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
