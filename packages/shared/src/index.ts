// Types
export * from './types';

// Constants
export * from './constants/colors';
export * from './constants/styles';

// Utils
export * from './utils/alarmHelpers';
export const getDaysList = () => ({
  sunday: true,
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
});

// Components
export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
export { default as Switch } from './components/Switch';
export { default as AlarmCard } from './components/AlarmCard';
export { default as TimePicker } from './components/TimePicker';
export { default as NumberPad } from './components/NumberPad';
export { default as VolumeIndicator } from './components/VolumeIndicator';
export { default as StepCounter } from './components/StepCounter';

// Hooks
export { useAlarms } from './hooks/useAlarms';
export { useAccelerometer } from './hooks/useAccelerometer';
export { useBackground, useAlarmChecker } from './hooks/useBackground';
