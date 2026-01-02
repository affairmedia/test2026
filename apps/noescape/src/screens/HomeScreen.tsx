import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAlarms } from '@noescape/shared';
import { COLORS, SPACING, FONT_SIZES } from '@noescape/shared';
import AlarmCard from '@noescape/shared';
import { Alarm } from '@noescape/shared';
import { HomeScreenProps } from '../navigation/types';
import AdBanner from '../components/AdBanner';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { alarms, loading, toggleAlarm, deleteAlarm } = useAlarms();

  const handleAddAlarm = () => {
    navigation.navigate('AlarmCreate');
  };

  const handleEditAlarm = (alarm: Alarm) => {
    navigation.navigate('AlarmEdit', { alarm });
  };

  const handleToggleAlarm = async (id: string) => {
    await toggleAlarm(id);
  };

  const handleDeleteAlarm = async (id: string) => {
    Alert.alert(
      'Supprimer l\'alarme',
      'Êtes-vous sûr de vouloir supprimer cette alarme ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteAlarm(id);
          },
        },
      ]
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>⏰</Text>
      <Text style={styles.emptyTitle}>Aucune alarme</Text>
      <Text style={styles.emptyText}>
        Créez votre première alarme pour commencer
      </Text>
    </View>
  );

  const renderAlarm = ({ item }: { item: Alarm }) => (
    <AlarmCard
      alarm={item}
      onToggle={handleToggleAlarm}
      onEdit={handleEditAlarm}
      onDelete={handleDeleteAlarm}
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>NoEscape</Text>
        <Text style={styles.subtitle}>Alarmes Brutales</Text>
      </View>

      <FlatList
        data={alarms}
        renderItem={renderAlarm}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      <AdBanner />

      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddAlarm}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray,
  },
  header: {
    padding: SPACING.lg,
    borderBottomWidth: 2,
    borderColor: COLORS.tertiary,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.alarm,
    letterSpacing: 2,
    marginTop: SPACING.xs,
    textTransform: 'uppercase',
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl * 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: SPACING.xxl + 60,
    right: SPACING.lg,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadowDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: COLORS.background,
    fontWeight: 'bold',
    lineHeight: 40,
  },
});

export default HomeScreen;
