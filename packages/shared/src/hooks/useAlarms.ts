import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alarm, AlarmFormData, Challenge } from '../types';
import { generateId, generateChallenge } from '../utils/alarmHelpers';

const ALARMS_KEY = '@noescape_alarms';

export const useAlarms = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlarms();
  }, []);

  const loadAlarms = async () => {
    try {
      const stored = await AsyncStorage.getItem(ALARMS_KEY);
      if (stored) {
        setAlarms(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load alarms:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAlarms = async (newAlarms: Alarm[]) => {
    try {
      await AsyncStorage.setItem(ALARMS_KEY, JSON.stringify(newAlarms));
      setAlarms(newAlarms);
    } catch (error) {
      console.error('Failed to save alarms:', error);
    }
  };

  const addAlarm = async (formData: AlarmFormData) => {
    const newAlarm: Alarm = {
      id: generateId(),
      time: formData.time,
      label: formData.label,
      frequency: formData.frequency,
      days: formData.days,
      isActive: true,
      challengeType: formData.challengeType,
      challenge: generateChallenge(formData.challengeType),
      volume: 30,
      createdAt: Date.now(),
    };

    await saveAlarms([...alarms, newAlarm]);
    return newAlarm;
  };

  const updateAlarm = async (id: string, formData: AlarmFormData) => {
    const updatedAlarms = alarms.map((alarm) => {
      if (alarm.id === id) {
        return {
          ...alarm,
          ...formData,
          challenge: generateChallenge(formData.challengeType),
        };
      }
      return alarm;
    });

    await saveAlarms(updatedAlarms);
  };

  const toggleAlarm = async (id: string) => {
    const updatedAlarms = alarms.map((alarm) =>
      alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
    );

    await saveAlarms(updatedAlarms);
  };

  const deleteAlarm = async (id: string) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    await saveAlarms(updatedAlarms);
  };

  const getAlarmById = (id: string): Alarm | undefined => {
    return alarms.find((alarm) => alarm.id === id);
  };

  const getActiveAlarms = (): Alarm[] => {
    return alarms.filter((alarm) => alarm.isActive);
  };

  const regenerateChallenge = async (alarmId: string) => {
    const updatedAlarms = alarms.map((alarm) => {
      if (alarm.id === alarmId) {
        return {
          ...alarm,
          challenge: generateChallenge(alarm.challengeType),
        };
      }
      return alarm;
    });

    await saveAlarms(updatedAlarms);
  };

  return {
    alarms,
    loading,
    addAlarm,
    updateAlarm,
    toggleAlarm,
    deleteAlarm,
    getAlarmById,
    getActiveAlarms,
    regenerateChallenge,
  };
};
