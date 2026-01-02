export type AlarmFrequency = 'once' | 'daily' | 'custom';

export type AlarmDays = {
  [key: string]: boolean;
};

export type ChallengeType = 'math' | 'walk';

export interface MathChallenge {
  type: 'math';
  operand1: number;
  operand2: number;
  operator: '+' | '-';
  answer: number;
}

export interface WalkChallenge {
  type: 'walk';
  requiredSteps: number;
  currentSteps: number;
}

export type Challenge = MathChallenge | WalkChallenge;

export interface Alarm {
  id: string;
  time: string;
  label: string;
  frequency: AlarmFrequency;
  days: AlarmDays;
  isActive: boolean;
  challengeType: ChallengeType;
  challenge: Challenge;
  volume: number;
  createdAt: number;
}

export interface AlarmFormData {
  time: string;
  label: string;
  frequency: AlarmFrequency;
  days: AlarmDays;
  challengeType: ChallengeType;
}

export interface VolumeSettings {
  startVolume: number;
  increaseInterval: number;
  increaseAmount: number;
  maxVolume: number;
}
