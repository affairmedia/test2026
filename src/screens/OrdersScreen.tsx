import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Header } from '../components/organisms/Header';
import { SearchBar } from '../components/molecules/SearchBar';
import { Card } from '../components/molecules/Card';
import { Typography } from '../components/atoms/Typography';
import { Button } from '../components/atoms/Button';
import { colors } from '../utils/colors';
import { spacing } from '../utils/spacing';
import { orders } from '../services/mockData';

export const OrdersScreen = () => {
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title="Orders" />
      
      <View style={styles.searchSection}>
        <SearchBar 
          value={search} 
          onChangeText={setSearch} 
          placeholder="Search orders..."
        />
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Typography variant="h3">{item.id}</Typography>
                <Typography variant="body2" color={colors.text.secondary}>
                  {item.date}
                </Typography>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Typography variant="caption" color={getStatusColor(item.status)}>
                  {item.status}
                </Typography>
              </View>
            </View>

            <View style={styles.orderBody}>
              <Typography variant="body1">{item.supplier}</Typography>
              <Typography variant="h3" color={colors.primary}>
                ${item.amount.toFixed(2)}
              </Typography>
            </View>

            <View style={styles.orderActions}>
              <Button 
                label="Decline" 
                variant="text" 
                style={styles.actionButton}
              />
              <Button 
                label="View Details" 
                variant="secondary" 
                style={styles.actionButton}
              />
              <Button 
                label="Accept" 
                style={styles.actionButton}
              />
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return colors.status.success;
    case 'Pending': return colors.status.warning;
    case 'Processing': return colors.status.info;
    default: return colors.text.secondary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchSection: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  listContent: {
    padding: spacing.m,
    gap: spacing.m,
  },
  orderCard: {
    padding: spacing.m,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.m,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  orderBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.s,
  },
  actionButton: {
    height: 36,
    paddingHorizontal: spacing.s,
  }
});
