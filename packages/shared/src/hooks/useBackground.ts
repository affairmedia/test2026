import { useState, useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import BackgroundService from 'react-native-background-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseBackgroundOptions {
  taskName: string;
  task: () => Promise<void>;
  interval?: number;
}

export const useBackground = ({
  taskName,
  task,
  interval = 60000,
}: UseBackgroundOptions) => {
  const [isRunning, setIsRunning] = useState(false);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    } else if (nextAppState.match(/inactive|background/)) {
      console.log('App has gone to the background!');
      await startBackgroundTask();
    }
    setAppState(nextAppState);
  };

  const startBackgroundTask = async () => {
    if (isRunning) return;

    try {
      const options = {
        taskName,
        taskTitle: 'NoEscape Alarm',
        taskDesc: 'Monitoring alarms in background',
        taskIcon: {
          name: 'ic_launcher',
          type: 'mipmap',
        },
        color: '#FF1744',
        linkingURI: 'noescape://',
        parameters: {
          delay: interval,
        },
      };

      await BackgroundService.start(task, options);
      setIsRunning(true);
      console.log('Background service started');
    } catch (error) {
      console.error('Failed to start background service:', error);
    }
  };

  const stopBackgroundTask = async () => {
    try {
      await BackgroundService.stop();
      setIsRunning(false);
      console.log('Background service stopped');
    } catch (error) {
      console.error('Failed to stop background service:', error);
    }
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return {
    isRunning,
    startBackgroundTask,
    stopBackgroundTask,
    appState,
    sleep,
  };
};

export const useAlarmChecker = (checkInterval: number = 60000) => {
  const { isRunning, startBackgroundTask, stopBackgroundTask, sleep } = useBackground({
    taskName: 'AlarmChecker',
    task: async () => {
      while (BackgroundService.isRunning()) {
        console.log('Checking alarms...');
        // Alarm checking logic will be implemented in the app
        await sleep(checkInterval);
      }
    },
    interval: checkInterval,
  });

  return {
    isAlarmCheckerRunning: isRunning,
    startAlarmChecker: startBackgroundTask,
    stopAlarmChecker: stopBackgroundTask,
  };
};
