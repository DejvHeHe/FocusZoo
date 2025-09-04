
import { useRef, useState, useCallback } from 'react';
import { saveStars } from '../functions/storage/Stars';

export default function useTimer(setStars, REWARD_RULES) {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAnimalSaveVisible, setAnimalSaveVisible] = useState(false);

  const intervalRef = useRef(null);

  const startTimer = useCallback((startMinutes) => {
    setIsTimerRunning(true);
    let totalTime = startMinutes * 60;

    intervalRef.current = setInterval(() => {
      totalTime--;

      setMinutes(Math.floor(totalTime / 60));
      setSeconds(totalTime % 60);

      if (totalTime <= 0) {
        clearInterval(intervalRef.current);
        setIsTimerRunning(false);

        REWARD_RULES.forEach(r => {
          if (startMinutes * 60 >= r.min) {
            setStars(prev => {
              const updated = prev + r.value;
              saveStars(updated);
              return updated;
            });
          }
        });

        setAnimalSaveVisible(true);
      }
    }, 1000);
  }, [setStars, REWARD_RULES]);

  return {
    minutes,
    seconds,
    isTimerRunning,
    isAnimalSaveVisible,
    setAnimalSaveVisible,
    startTimer,
    intervalRef,
    setMinutes,
    setSeconds,
    setIsTimerRunning,
  };
}
