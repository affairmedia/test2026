import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Menu, Bell } from 'lucide-react-native';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/spacing';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Menu size={24} color={colors.text.primary} />
      </TouchableOpacity>
      
      <Typography variant="h3" style={styles.title}>
        {title}
      </Typography>

      <TouchableOpacity style={styles.notification}>
        <Bell size={24} color={colors.text.primary} />
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    backgroundColor: colors.background,
    height: 60,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  notification: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.status.error,
    borderWidth: 1,
    borderColor: colors.background,
  },
});
