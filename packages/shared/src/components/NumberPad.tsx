import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/colors';
import Button from './Button';

interface NumberPadProps {
  onNumberPress: (number: number) => void;
  onDeletePress: () => void;
  onClearPress: () => void;
  onSubmitPress: () => void;
  disabled?: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({
  onNumberPress,
  onDeletePress,
  onClearPress,
  onSubmitPress,
  disabled = false,
}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <NumberButton number={1} onPress={onNumberPress} disabled={disabled} />
        <NumberButton number={2} onPress={onNumberPress} disabled={disabled} />
        <NumberButton number={3} onPress={onNumberPress} disabled={disabled} />
      </View>
      <View style={styles.row}>
        <NumberButton number={4} onPress={onNumberPress} disabled={disabled} />
        <NumberButton number={5} onPress={onNumberPress} disabled={disabled} />
        <NumberButton number={6} onPress={onNumberPress} disabled={disabled} />
      </View>
      <View style={styles.row}>
        <NumberButton number={7} onPress={onNumberPress} disabled={disabled} />
        <NumberButton number={8} onPress={onNumberPress} disabled={disabled} />
        <NumberButton number={9} onPress={onNumberPress} disabled={disabled} />
      </View>
      <View style={styles.row}>
        <Button
          title="C"
          onPress={onClearPress}
          variant="secondary"
          style={styles.button}
          disabled={disabled}
        />
        <NumberButton number={0} onPress={onNumberPress} disabled={disabled} />
        <Button
          title="⌫"
          onPress={onDeletePress}
          variant="secondary"
          style={styles.button}
          disabled={disabled}
        />
      </View>
      <Button
        title="Valider"
        onPress={onSubmitPress}
        variant="success"
        style={styles.submitButton}
        disabled={disabled}
      />
    </View>
  );
};

interface NumberButtonProps {
  number: number;
  onPress: (number: number) => void;
  disabled?: boolean;
}

const NumberButton: React.FC<NumberButtonProps> = ({ number, onPress, disabled }) => {
  return (
    <Button
      title={number.toString()}
      onPress={() => onPress(number)}
      variant="secondary"
      style={styles.numberButton}
      textStyle={styles.numberButtonText}
      disabled={disabled}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  numberButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    height: 56,
  },
  numberButtonText: {
    fontSize: FONT_SIZES.xxxl,
  },
  button: {
    flex: 1,
    marginHorizontal: SPACING.xs,
    height: 56,
  },
  submitButton: {
    marginTop: SPACING.sm,
    height: 56,
  },
});

export default NumberPad;
