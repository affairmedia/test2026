import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from '../../utils/colors';
import { typography } from '../../utils/typography';

interface TypographyProps extends TextProps {
  variant?: keyof typeof typography;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = colors.text.primary,
  align = 'auto',
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        typography[variant],
        { color, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
