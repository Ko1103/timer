'use client';

import { CountdownTimer } from '@/components/countdown-timer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTimer } from '@/hooks/use-timer';
import { PlayIcon } from 'lucide-react';

export function MainScreen() {
  const timer = useTimer();
  // const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  // const [goalHoursInput, setGoalHoursInput] = useState('1');

  // const handleSaveGoal = () => {
  //   const parsedHours = Number(goalHoursInput);
  //   const normalized =
  //     Number.isFinite(parsedHours) && parsedHours >= 0 ? parsedHours : 0;

  //   setGoalHoursInput(String(normalized));
  //   timer.setGoal(normalized);
  //   setIsGoalDialogOpen(false);
  // };

  // const pad = (value: number) => value.toString().padStart(2, '0');

  // const formatTime = (seconds: number) => {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   const secs = seconds % 60;
  //   return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  // };

  // const formatGoalRemaining = (seconds: number): string => {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   // hours:minutes の形式に変換、両方とも２桁表示
  //   return `${pad(hours)}:${pad(minutes)}`;
  // };

  // const goalRemainingSeconds: number = timer.remainingGoalHours
  //   ? timer.remainingGoalHours * 3600
  //   : 0;

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
        <div className="text-2xl font-bold text-muted-foreground">始める</div>
        <div className="space-y-6">
          {/* <div className="space-y-2">
            {savedGoalHours === null ? (
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
          </div> */}

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
          <div className="border-t border-border pt-4 space-x-2">
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
        </div>
      </Card>
    </div>
  );
}
