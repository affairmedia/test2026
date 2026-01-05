import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Header } from '../components/organisms/Header';
import { MetricCard } from '../components/molecules/MetricCard';
import { Typography } from '../components/atoms/Typography';
import { spacing } from '../utils/spacing';
import { colors } from '../utils/colors';
import { 
  Package, 
  AlertTriangle, 
  ShoppingCart, 
  Truck,
  TrendingUp
} from 'lucide-react-native';
import { metrics } from '../services/mockData';
import Animated, { 
  FadeInDown, 
  FadeInRight 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Smart Stock" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(200)}
          style={styles.welcomeSection}
        >
          <Typography variant="h2">Hello, Admin</Typography>
          <Typography variant="body1" color={colors.text.secondary}>
            Here's what's happening today
          </Typography>
        </Animated.View>

        <View style={styles.grid}>
          <Animated.View entering={FadeInDown.delay(300)} style={styles.gridItem}>
            <MetricCard
              label="Total Items"
              value={metrics.inventoryCount}
              icon={<Package size={24} color={colors.primary} />}
              bgColor="#FFF5F5"
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(400)} style={styles.gridItem}>
            <MetricCard
              label="Low Stock"
              value={metrics.lowStockItems}
              icon={<AlertTriangle size={24} color={colors.status.warning} />}
              bgColor="#FFFBEB"
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(500)} style={styles.gridItem}>
            <MetricCard
              label="Pending Orders"
              value={metrics.pendingOrders}
              icon={<ShoppingCart size={24} color={colors.status.info} />}
              bgColor="#EFF6FF"
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(600)} style={styles.gridItem}>
            <MetricCard
              label="Suppliers"
              value={metrics.totalSuppliers}
              icon={<Truck size={24} color={colors.status.success} />}
              bgColor="#F0FDF4"
            />
          </Animated.View>
        </View>

        <Animated.View 
          entering={FadeInRight.delay(700)}
          style={styles.statsSection}
        >
          <View style={styles.statsHeader}>
            <Typography variant="h3">Sales Overview</Typography>
            <TrendingUp size={20} color={colors.status.success} />
          </View>
          <View style={styles.mockChart}>
             {/* Mock Chart representation */}
             {[40, 70, 45, 90, 65, 80, 95].map((height, i) => (
               <View 
                key={i} 
                style={[
                  styles.chartBar, 
                  { height: height, backgroundColor: i === 6 ? colors.primary : colors.secondary }
                ]} 
               />
             ))}
          </View>
          <View style={styles.chartLabels}>
             {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
               <Typography key={i} variant="caption" color={colors.text.secondary}>{day}</Typography>
             ))}
          </View>
        </Animated.View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.m,
  },
  welcomeSection: {
    marginBottom: spacing.l,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.l,
  },
  gridItem: {
    width: '50%',
  },
  statsSection: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  mockChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    marginBottom: spacing.s,
  },
  chartBar: {
    width: (width - 80) / 7,
    borderRadius: 4,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  }
});
