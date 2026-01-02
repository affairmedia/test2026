import React from 'react';
import { Switch as RNSwitch, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../constants/colors';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  style,
  disabled = false,
}) => {
  return (
    <RNSwitch
      style={[styles.switch, style]}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: COLORS.tertiary,
        true: COLORS.success,
      }}
      thumbColor={value ? COLORS.white : COLORS.gray}
      ios_backgroundColor={COLORS.tertiary}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default Switch;
