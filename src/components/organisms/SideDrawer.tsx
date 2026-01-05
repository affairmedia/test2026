import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Typography } from '../atoms/Typography';
import { colors } from '../../utils/colors';
import { spacing, borderRadius } from '../../utils/spacing';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const SuppliersIcon = Users;

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, route: 'Dashboard' },
  { label: 'Inventory', icon: Package, route: 'Inventory' },
  { label: 'Orders', icon: ShoppingCart, route: 'Orders' },
  { label: 'Suppliers', icon: SuppliersIcon, route: 'Suppliers' },
  { label: 'Settings', icon: Settings, route: 'Settings' },
];

export const SideDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { state, navigation } = props;
  
  // Get active tab name from nested state
  const mainRoute = state.routes.find(r => r.name === 'Main');
  const activeTabName = mainRoute?.state?.routeNames 
    ? mainRoute.state.routeNames[mainRoute.state.index ?? 0]
    : 'Dashboard';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Typography variant="h2" color={colors.text.light}>JD</Typography>
        </View>
        <View style={styles.headerText}>
          <Typography variant="h3">John Doe</Typography>
          <Typography variant="body2" color={colors.text.secondary}>john.doe@smartstock.com</Typography>
        </View>
      </View>

      <ScrollView style={styles.menu}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTabName === item.route;

          return (
            <TouchableOpacity
              key={item.route}
              style={[
                styles.menuItem,
                isActive && styles.activeMenuItem
              ]}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('Main', { screen: item.route });
              }}
            >
              <Icon 
                size={24} 
                color={isActive ? colors.primary : colors.text.secondary} 
              />
              <Typography
                variant="body1"
                style={[
                  styles.menuLabel,
                  isActive && styles.activeMenuLabel
                ]}
              >
                {item.label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.logout}>
        <LogOut size={24} color={colors.text.secondary} />
        <Typography variant="body1" style={styles.menuLabel}>Logout</Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: spacing.m,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  headerText: {
    gap: 4,
  },
  menu: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: spacing.m,
    marginHorizontal: spacing.s,
    borderRadius: borderRadius.small,
    marginBottom: spacing.xs,
  },
  activeMenuItem: {
    backgroundColor: colors.secondary,
  },
  menuLabel: {
    marginLeft: spacing.m,
    color: colors.text.secondary,
  },
  activeMenuLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
