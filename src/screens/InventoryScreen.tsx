import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  RefreshControl 
} from 'react-native';
import { Header } from '../components/organisms/Header';
import { SearchBar } from '../components/molecules/SearchBar';
import { FilterBar } from '../components/molecules/FilterBar';
import { ListItem } from '../components/molecules/ListItem';
import { Typography } from '../components/atoms/Typography';
import { colors } from '../utils/colors';
import { spacing } from '../utils/spacing';
import { Plus, Package } from 'lucide-react-native';
import { inventory } from '../services/mockData';

const filters = ['All', 'Low Stock', 'Out of Stock', 'Grains', 'Spices', 'Pulses'];

export const InventoryScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const filteredData = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = 
      selectedFilter === 'All' || 
      item.status === selectedFilter || 
      item.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return colors.status.success;
      case 'Low Stock': return colors.status.warning;
      case 'Out of Stock': return colors.status.error;
      default: return colors.text.secondary;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Inventory" />
      
      <View style={styles.searchSection}>
        <SearchBar 
          value={search} 
          onChangeText={setSearch} 
          placeholder="Search products..."
        />
      </View>

      <FilterBar 
        filters={filters}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={`${item.category} • ${item.quantity} in stock`}
            leftContent={
              <View style={styles.iconContainer}>
                <Package size={24} color={colors.primary} />
              </View>
            }
            rightContent={
              <View style={styles.rightContent}>
                <Typography variant="body1" style={styles.price}>
                  ${item.price.toFixed(2)}
                </Typography>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                  <Typography variant="caption" color={getStatusColor(item.status)}>
                    {item.status}
                  </Typography>
                </View>
              </View>
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Typography variant="body1" color={colors.text.secondary}>
              No items found
            </Typography>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab}>
        <Plus size={32} color={colors.text.light} />
      </TouchableOpacity>
    </View>
  );
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
    paddingBottom: 100,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent: {
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  fab: {
    position: 'absolute',
    right: spacing.m,
    bottom: spacing.m,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
});
