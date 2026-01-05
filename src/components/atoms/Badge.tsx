import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { Typography } from './Typography';

interface BadgeProps {
  count?: number;
  size?: number;
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  count,
  size = 20,
  color = colors.status.error,
}) => {
  if (count === 0) return null;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
      ]}
    >
      {count !== undefined && (
        <Typography
          variant="caption"
          color={colors.text.light}
          style={styles.text}
        >
          {count > 99 ? '99+' : count}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 1,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
