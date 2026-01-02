import { AlarmFrequency, AlarmDays, ChallengeType, Challenge, MathChallenge, WalkChallenge } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

export const getNextAlarmTime = (time: string, frequency: AlarmFrequency, days: AlarmDays): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  let alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  if (frequency === 'daily') {
    if (alarmTime <= now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }
  } else if (frequency === 'custom') {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let daysChecked = 0;

    while (daysChecked < 7) {
      if (alarmTime > now) {
        const dayName = dayNames[alarmTime.getDay()];
        if (days[dayName]) {
          break;
        }
      }
      alarmTime.setDate(alarmTime.getDate() + 1);
      daysChecked++;
    }
  } else if (frequency === 'once') {
    if (alarmTime <= now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }
  }

  return alarmTime;
};

export const generateMathChallenge = (): MathChallenge => {
  const operator = Math.random() > 0.5 ? '+' : '-';
  let operand1 = Math.floor(Math.random() * 50) + 1;
  let operand2 = Math.floor(Math.random() * 50) + 1;

  if (operator === '-') {
    if (operand1 < operand2) {
      [operand1, operand2] = [operand2, operand1];
    }
  }

  const answer = operator === '+' ? operand1 + operand2 : operand1 - operand2;

  return {
    type: 'math',
    operand1,
    operand2,
    operator,
    answer,
  };
};

export const generateWalkChallenge = (): WalkChallenge => {
  const requiredSteps = Math.floor(Math.random() * 21) + 10; // 10-30 steps
  return {
    type: 'walk',
    requiredSteps,
    currentSteps: 0,
  };
};

export const generateChallenge = (type: ChallengeType): Challenge => {
  return type === 'math' ? generateMathChallenge() : generateWalkChallenge();
};

export const validateMathAnswer = (challenge: MathChallenge, userAnswer: number): boolean => {
  return userAnswer === challenge.answer;
};

export const formatFrequency = (frequency: AlarmFrequency, days: AlarmDays): string => {
  if (frequency === 'daily') {
    return 'Tous les jours';
  }
  if (frequency === 'once') {
    return 'Une seule fois';
  }
  if (frequency === 'custom') {
    const dayNames = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
    const activeDays = Object.entries(days)
      .filter(([_, active]) => active)
      .map(([day, _]) => dayNames[Object.keys(days).indexOf(day)])
      .join(', ');
    return activeDays || 'Personnaliser';
  }
  return '';
};
