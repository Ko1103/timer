import { useState } from 'react';

const electron =
  typeof window !== 'undefined' && window.electron ? window.electron : null;

export type TimerMode = 'focus' | 'rest';

export type Timer = {
  mode: TimerMode;
  minutes: number;
};

export function useTimer() {
  // タイマーのリスト
  const [timers, setTimers] = useState<Timer[]>([]);
  // 1日の合計時間(分)
  const [totalMinutes, setTotalMinutes] = useState(0);
  // 目標時間(時間)
  const [goalHours, setGoalHours] = useState<number | null>(null);
  const remainingGoalHours = goalHours ? goalHours - totalMinutes / 60 : null;

  // タイマーをセットする（複数も可能)
  const setTimer = (timerSets: Timer[]) => {
    setTimers(timerSets);
  };

  // タイマーを終了
  const onFinish = () => {
    const first = timers[0] ?? null;
    if (first === null) return;

    // 合計時間を更新
    let minutes = first.minutes ?? 0;
    if (first.mode === 'rest') {
      minutes = 0;
    }
    setTotalMinutes((prev) => prev + minutes);

    if (first.mode === 'focus') {
      electron?.ipcRenderer.sendMessage('timer-finished', {
        minutes: first.minutes,
      });
    }

    // 次のタイマーをセット
    if (timers.length > 0) {
      const nextTimers = timers.slice(1);
      setTimer(nextTimers);
    } else {
      setTimer([]);
    }
  };

  // キャンセル
  const cancel = () => {
    setTimers([]);
  };

  // 一時停止
  const pause = () => {
    // 何もしない
  };

  const setGoal = (hours: number) => {
    setGoalHours(hours);
  };

  // 休憩をスキップして次のタイマーを開始
  const skipRest = () => {
    const first = timers[0];
    if (first.mode === 'rest') {
      const nextTimers = timers.slice(1);
      if (nextTimers.length > 0) {
        setTimer(nextTimers);
      } else {
        setTimer([]);
      }
    }
  };

  return {
    timers,
    totalMinutes,
    goalHours,
    remainingGoalHours,
    onFinish,
    setTimer,
    cancel,
    pause,
    setGoal,
    skipRest,
  };
}
