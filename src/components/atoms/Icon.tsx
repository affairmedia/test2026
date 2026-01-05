import React from 'react';
import { colors } from '../../utils/colors';

interface IconProps {
  icon: any;
  size?: 16 | 24 | 32;
  color?: string;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 24,
  color = colors.text.primary,
  strokeWidth = 2,
}) => {
  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
};
