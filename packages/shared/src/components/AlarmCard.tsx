import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Alarm } from '../types';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/colors';
import { formatTime, formatFrequency } from '../utils/alarmHelpers';
import Switch from './Switch';

interface AlarmCardProps {
  alarm: Alarm;
  onToggle: (id: string) => void;
  onEdit: (alarm: Alarm) => void;
  onDelete: (id: string) => void;
}

const AlarmCard: React.FC<AlarmCardProps> = ({
  alarm,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const getChallengeIcon = () => {
    return alarm.challengeType === 'math' ? '🔢' : '👣';
  };

  return (
    <TouchableOpacity
      style={[styles.card, !alarm.isActive && styles.cardInactive]}
      onPress={() => onEdit(alarm)}
      activeOpacity={0.7}
    >
      <View style={styles.topRow}>
        <View style={styles.timeContainer}>
          <Text style={[styles.time, !alarm.isActive && styles.timeInactive]}>
            {formatTime(alarm.time)}
          </Text>
          <Text style={[styles.label, !alarm.isActive && styles.labelInactive]}>
            {alarm.label || 'Alarme'}
          </Text>
        </View>
        <Switch
          value={alarm.isActive}
          onValueChange={() => onToggle(alarm.id)}
        />
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.infoRow}>
          <Text style={styles.icon}>{getChallengeIcon()}</Text>
          <Text style={styles.frequency}>
            {formatFrequency(alarm.frequency, alarm.days)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation();
            onDelete(alarm.id);
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteIcon}>✕</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: COLORS.tertiary,
  },
  cardInactive: {
    opacity: 0.5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 2,
  },
  timeInactive: {
    color: COLORS.gray,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
    marginTop: -SPACING.xs,
  },
  labelInactive: {
    color: COLORS.lightGray,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: FONT_SIZES.lg,
    marginRight: SPACING.sm,
  },
  frequency: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.lightGray,
  },
  deleteButton: {
    padding: SPACING.xs,
  },
  deleteIcon: {
    fontSize: FONT_SIZES.md,
    color: COLORS.alarm,
    fontWeight: 'bold',
  },
});

export default AlarmCard;
