import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/spacing';
import { Typography } from './Typography';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  active = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        active ? styles.active : styles.inactive,
        style,
      ]}
    >
      <Typography
        variant="body2"
        color={active ? colors.text.light : colors.text.secondary}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.s,
  },
  active: {
    backgroundColor: colors.primary,
  },
  inactive: {
    backgroundColor: colors.chip.bg,
  },
});
