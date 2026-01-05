import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from '../atoms/Chip';
import { spacing } from '../../utils/spacing';

interface FilterBarProps {
  filters: string[];
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  selectedFilter,
  onSelectFilter,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => (
        <Chip
          key={filter}
          label={filter}
          active={selectedFilter === filter}
          onPress={() => onSelectFilter(filter)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
  },
});
