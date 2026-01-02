import type { Alarm } from '@noescape/shared';
import { getNextAlarmTime, formatTime } from '@noescape/shared';

export class AlarmService {
  /**
   * Check if any alarm should ring now
   */
  static checkAlarms(alarms: Alarm[]): Alarm | null {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
      2,
      '0'
    )}`;

    for (const alarm of alarms) {
      if (!alarm.isActive) continue;

      const shouldRingToday = this.shouldRingToday(alarm, now);
      if (shouldRingToday && alarm.time === currentTime) {
        return alarm;
      }
    }

    return null;
  }

  /**
   * Check if alarm should ring on a specific day
   */
  static shouldRingToday(alarm: Alarm, date: Date): boolean {
    if (alarm.frequency === 'daily') {
      return true;
    }

    if (alarm.frequency === 'once') {
      const alarmDate = getNextAlarmTime(alarm.time, alarm.frequency, alarm.days);
      return (
        alarmDate.getDate() === date.getDate() &&
        alarmDate.getMonth() === date.getMonth() &&
        alarmDate.getFullYear() === date.getFullYear()
      );
    }

    if (alarm.frequency === 'custom') {
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayName = dayNames[date.getDay()];
      return alarm.days[dayName] || false;
    }

    return false;
  }

  /**
   * Get the next alarm to ring
   */
  static getNextAlarm(alarms: Alarm[]): { alarm: Alarm; time: Date } | null {
    const activeAlarms = alarms.filter((a) => a.isActive);
    if (activeAlarms.length === 0) return null;

    let closestAlarm: Alarm | null = null;
    let closestTime: Date | null = null;

    for (const alarm of activeAlarms) {
      const nextTime = getNextAlarmTime(alarm.time, alarm.frequency, alarm.days);
      if (!closestTime || nextTime < closestTime) {
        closestTime = nextTime;
        closestAlarm = alarm;
      }
    }

    return closestAlarm && closestTime ? { alarm: closestAlarm, time: closestTime } : null;
  }

  /**
   * Get time until next alarm in milliseconds
   */
  static getTimeUntilNextAlarm(alarms: Alarm[]): number {
    const nextAlarm = this.getNextAlarm(alarms);
    if (!nextAlarm) return -1;

    return nextAlarm.time.getTime() - Date.now();
  }

  /**
   * Format time until alarm
   */
  static formatTimeUntil(ms: number): string {
    if (ms <= 0) return 'Maintenant';

    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} jour${days > 1 ? 's' : ''}`;
    }
    if (hours > 0) {
      const remainingMinutes = minutes % 60;
      return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`;
    }
    return `${minutes} min`;
  }
}
