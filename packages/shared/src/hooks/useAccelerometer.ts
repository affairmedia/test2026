import { useState, useEffect, useRef } from 'react';
import { Accelerometer } from 'react-native-sensors';

interface AccelerometerData {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

interface UseAccelerometerOptions {
  updateInterval?: number;
  threshold?: number;
  debounceTime?: number;
}

interface UseAccelerometerReturn {
  steps: number;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetSteps: () => void;
}

export const useAccelerometer = (
  options: UseAccelerometerOptions = {}
): UseAccelerometerReturn => {
  const {
    updateInterval = 100,
    threshold = 2,
    debounceTime = 300,
  } = options;

  const [steps, setSteps] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const subscriptionRef = useRef<any>(null);
  const lastStepRef = useRef<number>(0);
  const lastDataRef = useRef<AccelerometerData | null>(null);

  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  const detectStep = (data: AccelerometerData): boolean => {
    if (!lastDataRef.current) {
      lastDataRef.current = data;
      return false;
    }

    const prev = lastDataRef.current;
    const now = data;

    // Calculate magnitude of acceleration
    const prevMagnitude = Math.sqrt(prev.x ** 2 + prev.y ** 2 + prev.z ** 2);
    const nowMagnitude = Math.sqrt(now.x ** 2 + now.y ** 2 + now.z ** 2);
    const delta = Math.abs(nowMagnitude - prevMagnitude);

    // Check if threshold exceeded
    if (delta > threshold) {
      const nowTime = Date.now();
      // Debounce to prevent multiple detections from single step
      if (nowTime - lastStepRef.current > debounceTime) {
        lastStepRef.current = nowTime;
        lastDataRef.current = data;
        return true;
      }
    }

    lastDataRef.current = data;
    return false;
  };

  const startListening = () => {
    if (subscriptionRef.current) return;

    try {
      const sensor = new Accelerometer({ updateInterval });
      subscriptionRef.current = sensor.subscribe(({ x, y, z, timestamp }) => {
        const data: AccelerometerData = { x, y, z, timestamp };

        if (detectStep(data)) {
          setSteps((prev) => prev + 1);
        }
      });

      setIsListening(true);
    } catch (error) {
      console.error('Failed to start accelerometer:', error);
    }
  };

  const stopListening = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }
    setIsListening(false);
  };

  const resetSteps = () => {
    setSteps(0);
    lastStepRef.current = 0;
    lastDataRef.current = null;
  };

  return {
    steps,
    isListening,
    startListening,
    stopListening,
    resetSteps,
  };
};
