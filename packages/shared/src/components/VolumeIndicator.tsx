import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/colors';

interface VolumeIndicatorProps {
  volume: number;
  maxVolume: number;
}

const VolumeIndicator: React.FC<VolumeIndicatorProps> = ({ volume, maxVolume }) => {
  const bars = 10;
  const activeBars = Math.ceil((volume / maxVolume) * bars);

  const getBarColor = (index: number): string => {
    if (index < activeBars * 0.3) return COLORS.success;
    if (index < activeBars * 0.7) return COLORS.warning;
    return COLORS.alarm;
  };

  return (
    <View style={styles.container}>
      {[...Array(bars)].map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              backgroundColor: index < activeBars ? getBarColor(index) : COLORS.tertiary,
              height: 20 + (index * 8),
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.sm,
  },
  bar: {
    width: 20,
    borderRadius: 2,
  },
});

export default VolumeIndicator;
