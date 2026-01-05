import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';
import { spacing, borderRadius } from '../../utils/spacing';
import { shadows } from '../../utils/shadows';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  elevation?: keyof typeof shadows;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  elevation = 'light',
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (onPress) scale.value = withSpring(0.99);
  };

  const handlePressOut = () => {
    if (onPress) scale.value = withSpring(1);
  };

  const Content = onPress ? AnimatedTouchableOpacity : View;

  return (
    <Content
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      style={[
        styles.container,
        shadows[elevation],
        animatedStyle,
        style,
      ]}
    >
      {children}
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.large,
    padding: spacing.m,
  },
});
