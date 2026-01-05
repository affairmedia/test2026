import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../atoms/Typography';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/spacing';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onPress?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftContent,
  rightContent,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.left}>
        {leftContent}
      </View>
      <View style={styles.center}>
        <Typography variant="body1" numberOfLines={1}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color={colors.text.secondary} numberOfLines={1}>
            {subtitle}
          </Typography>
        )}
      </View>
      <View style={styles.right}>
        {rightContent}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    minHeight: 64,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  left: {
    marginRight: spacing.m,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    marginLeft: spacing.s,
    alignItems: 'flex-end',
  },
});
