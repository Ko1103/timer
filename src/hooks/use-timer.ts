import { useState } from 'react';

export type TimerMode = 'focus' | 'rest';

export type Timer = {
  mode: TimerMode;
  minutes: number;
};

export function useTimer() {
  // 現在のモード
  const [mode, setMode] = useState<'focus' | 'rest' | null>(null);
  const [minutes, setMinutes] = useState(0);
  // タイマーのリスト
  const [timers, setTimers] = useState<Timer[]>([]);
  //　　1日の合計時間(分)
  const [totalMinutes, setTotalMinutes] = useState(0);
  // 目標時間(時間)
  const [goalHours, setGoalHours] = useState<number | null>(null);
  const remainingGoalHours = goalHours ? goalHours - totalMinutes / 60 : null;

  // タイマーをセットする（複数も可能)
  const setTimer = (timers: Timer[]) => {
    setTimers(timers);
    const first = timers[0];
    setMinutes(first.minutes);
    setMode(first.mode);
  };

  // タイマーを開始
  const onFinish = () => {
    setTotalMinutes((prev) => prev + minutes);
    const nextTimers = timers.slice(1);
    if (nextTimers.length > 0) {
      setTimer(nextTimers);
    } else {
      setMode(null);
    }
  };

  // キャンセル
  const cancel = () => {
    setMode(null);
    setMinutes(0);
    setTimers([]);
  };

  // 一時停止
  const pause = () => {
    // 何もしない
  };

  const setGoal = (hours: number) => {
    setGoalHours(hours);
  };

  return {
    mode,
    minutes,
    totalMinutes,
    goalHours,
    remainingGoalHours,
    onFinish,
    setTimer,
    cancel,
    pause,
    setGoal,
  };
}
