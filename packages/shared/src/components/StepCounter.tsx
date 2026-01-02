import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/colors';

interface StepCounterProps {
  current: number;
  required: number;
}

const StepCounter: React.FC<StepCounterProps> = ({ current, required }) => {
  const progress = Math.min((current / required) * 100, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{current}</Text>
      <Text style={styles.separator}>/</Text>
      <Text style={styles.required}>{required}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.label}>PAS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  number: {
    fontSize: FONT_SIZES.huge,
    fontWeight: 'bold',
    color: COLORS.success,
    letterSpacing: 4,
  },
  separator: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.gray,
    marginHorizontal: SPACING.sm,
  },
  required: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.gray,
    letterSpacing: 2,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.tertiary,
    borderRadius: 4,
    marginTop: SPACING.md,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.success,
  },
  label: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray,
    marginTop: SPACING.sm,
    letterSpacing: 2,
  },
});

export default StepCounter;
