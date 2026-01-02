import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/colors';
import { brutalistShadow } from '../constants/styles';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getVariantStyles = (): { button: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          button: {
            backgroundColor: COLORS.white,
          },
          text: {
            color: COLORS.background,
          },
        };
      case 'secondary':
        return {
          button: {
            backgroundColor: COLORS.secondary,
            borderWidth: 2,
            borderColor: COLORS.gray,
          },
          text: {
            color: COLORS.white,
          },
        };
      case 'danger':
        return {
          button: {
            backgroundColor: COLORS.alarm,
          },
          text: {
            color: COLORS.white,
          },
        };
      case 'success':
        return {
          button: {
            backgroundColor: COLORS.success,
          },
          text: {
            color: COLORS.background,
          },
        };
      default:
        return {
          button: {
            backgroundColor: COLORS.white,
          },
          text: {
            color: COLORS.background,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles.button,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        brutalistShadow,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color} />
      ) : (
        <Text style={[styles.text, variantStyles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;
