import { useEffect } from 'react';
import { AppState } from 'react-native';
import Toast from 'react-native-toast-message';

export default function useAppStateHandler({
  appState,
  intervalRef,
  setIsTimerRunning,
  setMinutes,
  setSeconds,
  hasUserLeftDuringTimer,
}) {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      // Going to background
      if (appState.current === 'active' && nextAppState === 'background') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsTimerRunning(false);
          hasUserLeftDuringTimer.current = true;
          setMinutes(30);
          setSeconds(0);
        }
      }

      // Coming back from background
      if (
        appState.current === 'background' &&
        nextAppState === 'active' &&
        hasUserLeftDuringTimer.current
      ) {
        Toast.show({
          type: 'info',
          text1: 'Pozor!',
          text2: 'Odešel jsi z aplikace 👀',
          position: 'top',
        });
        hasUserLeftDuringTimer.current = false;
      }

      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [appState, intervalRef, setIsTimerRunning, setMinutes, setSeconds, hasUserLeftDuringTimer]);
}
