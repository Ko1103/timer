'use client';

import { useState } from 'react';
import { CountdownTimer } from '@/components/countdown-timer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function MainScreen() {
  const [timerMode, setTimerMode] = useState<
    'Focus' | 'Rest' | 'Custom' | null
  >(null);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [customHours, setCustomHours] = useState('0');
  const [customMinutes, setCustomMinutes] = useState('0');
  const [customSeconds, setCustomSeconds] = useState('0');
  const [customTimerSeconds, setCustomTimerSeconds] = useState(0);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTimerComplete = () => {
    if (timerMode === 'Focus') {
      setTotalWorkTime((prev) => prev + 3600); // Add 60 minutes
    } else if (timerMode === 'Custom') {
      setTotalWorkTime((prev) => prev + customTimerSeconds);
    }
    setTimerMode(null);
  };

  const handleCancel = () => {
    setTimerMode(null);
  };

  const handleStartCustomTimer = () => {
    const hours = Number.parseInt(customHours, 10) || 0;
    const minutes = Number.parseInt(customMinutes, 10) || 0;
    const seconds = Number.parseInt(customSeconds, 10) || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
      setCustomTimerSeconds(totalSeconds);
      setTimerMode('Custom');
    }
  };

  if (timerMode) {
    const timerSeconds =
      timerMode === 'Focus'
        ? 3600
        : timerMode === 'Rest'
          ? 300
          : customTimerSeconds;

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <CountdownTimer
          title={timerMode === 'Custom' ? 'Focus' : timerMode}
          initialSeconds={timerSeconds}
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
          {/* Today's Work Time Section */}
          <div className="text-center space-y-2">
            <h2 className="text-lg font-medium text-muted-foreground">
              今日の稼働時間
            </h2>
            <div className="font-mono text-5xl font-bold tracking-wider text-foreground tabular-nums">
              {formatTime(totalWorkTime)}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
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
          </div>

          {/* Button Section */}
          <div className="flex flex-col gap-3 pt-4 border-t border-border">
            <Button
              onClick={() => setTimerMode('Focus')}
              size="lg"
              className="w-full text-lg font-semibold h-14 bg-accent hover:bg-accent/90"
            >
              Focus 60分
            </Button>
            <Button
              onClick={() => setTimerMode('Rest')}
              size="lg"
              variant="outline"
              className="w-full text-lg font-semibold h-14"
            >
              Rest 5分
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
