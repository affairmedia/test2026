import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Header } from '../components/organisms/Header';
import { ListItem } from '../components/molecules/ListItem';
import { colors } from '../utils/colors';
import { spacing } from '../utils/spacing';
import { User, Phone, Mail } from 'lucide-react-native';
import { suppliers } from '../services/mockData';

export const SuppliersScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Suppliers" />
      
      <FlatList
        data={suppliers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={item.category}
            leftContent={
              <View style={styles.iconContainer}>
                <User size={24} color={colors.primary} />
              </View>
            }
            rightContent={
              <View style={styles.contactIcons}>
                <Phone size={20} color={colors.text.secondary} />
                <Mail size={20} color={colors.text.secondary} />
              </View>
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: spacing.s,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIcons: {
    flexDirection: 'row',
    gap: spacing.m,
  }
});
