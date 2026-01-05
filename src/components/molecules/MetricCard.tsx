import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Typography } from '../atoms/Typography';
import { spacing } from '../../utils/spacing';
import { colors } from '../../utils/colors';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  bgColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  trend,
  bgColor = colors.background,
}) => {
  return (
    <Card style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>{icon}</View>
        {trend && (
          <Typography variant="caption" color={colors.status.success}>
            {trend}
          </Typography>
        )}
      </View>
      <Typography variant="h2" style={styles.value}>
        {value}
      </Typography>
      <Typography variant="caption" color={colors.text.secondary}>
        {label}
      </Typography>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: spacing.xs,
    minWidth: '45%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.s,
  },
  iconContainer: {
    padding: spacing.xs,
    borderRadius: 8,
  },
  value: {
    marginBottom: spacing.xs,
  },
});
