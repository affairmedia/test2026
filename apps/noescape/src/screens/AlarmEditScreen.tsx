import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useAlarms } from '@noescape/shared';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  AlarmFrequency,
  ChallengeType,
} from '@noescape/shared';
import Button from '@noescape/shared';
import Input from '@noescape/shared';
import TimePicker from '@noescape/shared';
import { getDaysList } from '@noescape/shared';
import { AlarmEditScreenProps } from '../navigation/types';
import { Alarm } from '@noescape/shared';
import AdBanner from '../components/AdBanner';

const DAY_NAMES = [
  { key: 'monday', label: 'Lun' },
  { key: 'tuesday', label: 'Mar' },
  { key: 'wednesday', label: 'Mer' },
  { key: 'thursday', label: 'Jeu' },
  { key: 'friday', label: 'Ven' },
  { key: 'saturday', label: 'Sam' },
  { key: 'sunday', label: 'Dim' },
];

const AlarmEditScreen: React.FC<AlarmEditScreenProps> = ({ route, navigation }) => {
  const { alarm: initialAlarm } = route.params;
  const { updateAlarm, deleteAlarm } = useAlarms();

  const [time, setTime] = useState(initialAlarm.time);
  const [label, setLabel] = useState(initialAlarm.label);
  const [frequency, setFrequency] = useState<AlarmFrequency>(initialAlarm.frequency);
  const [days, setDays] = useState(initialAlarm.days);
  const [challengeType, setChallengeType] = useState<ChallengeType>(initialAlarm.challengeType);

  const handleToggleDay = (day: string) => {
    setDays({ ...days, [day]: !days[day] });
  };

  const handleSave = async () => {
    try {
      const finalDays = frequency === 'custom' ? days : getDaysList();

      await updateAlarm(initialAlarm.id, {
        time,
        label,
        frequency,
        days: finalDays,
        challengeType,
      });

      navigation.goBack();
    } catch (error) {
      console.error('Failed to update alarm:', error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDelete = () => {
    navigation.navigate('Home');
    setTimeout(() => deleteAlarm(initialAlarm.id), 100);
  };

  const ChallengeButton = ({ type, icon }: { type: ChallengeType; icon: string }) => (
    <TouchableOpacity
      style={[styles.challengeButton, challengeType === type && styles.challengeButtonSelected]}
      onPress={() => setChallengeType(type)}
      activeOpacity={0.7}
    >
      <Text style={styles.challengeIcon}>{icon}</Text>
      <Text style={[styles.challengeLabel, challengeType === type && styles.challengeLabelSelected]}>
        {type === 'math' ? 'Math' : 'Marche'}
      </Text>
    </TouchableOpacity>
  );

  const DayButton = ({ day, label }: { day: string; label: string }) => (
    <TouchableOpacity
      style={[styles.dayButton, days[day] && styles.dayButtonSelected]}
      onPress={() => handleToggleDay(day)}
      disabled={frequency !== 'custom'}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.dayButtonText,
          frequency !== 'custom' && styles.dayButtonTextDisabled,
          days[day] && styles.dayButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Modifier l'alarme</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Heure</Text>
            <TimePicker value={time} onChange={setTime} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Label (optionnel)</Text>
            <Input
              placeholder="Ex: Réveil, Médicament..."
              value={label}
              onChangeText={setLabel}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Récurrence</Text>
            <View style={styles.frequencyContainer}>
              {(['once', 'daily', 'custom'] as AlarmFrequency[]).map((freq) => (
                <TouchableOpacity
                  key={freq}
                  style={[styles.frequencyButton, frequency === freq && styles.frequencyButtonSelected]}
                  onPress={() => setFrequency(freq)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.frequencyButtonText,
                      frequency === freq && styles.frequencyButtonTextSelected,
                    ]}
                  >
                    {freq === 'once' ? 'Une fois' : freq === 'daily' ? 'Tous les jours' : 'Personnaliser'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {frequency === 'custom' && (
              <View style={styles.daysContainer}>
                {DAY_NAMES.map(({ key, label }) => (
                  <DayButton key={key} day={key} label={label} />
                ))}
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Challenge de désactivation</Text>
            <View style={styles.challengeContainer}>
              <ChallengeButton type="math" icon="🔢" />
              <ChallengeButton type="walk" icon="👣" />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Annuler"
              onPress={handleCancel}
              variant="secondary"
              style={styles.button}
            />
            <Button
              title="Sauvegarder"
              onPress={handleSave}
              variant="primary"
              style={styles.button}
            />
          </View>

          <Button
            title="Supprimer"
            onPress={handleDelete}
            variant="danger"
            style={styles.deleteButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <AdBanner />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xxl * 2,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.lg,
    letterSpacing: 1,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.gray,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },
  frequencyContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.tertiary,
    alignItems: 'center',
    borderRadius: 4,
  },
  frequencyButtonSelected: {
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.gray,
  },
  frequencyButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
    fontWeight: '600',
  },
  frequencyButtonTextSelected: {
    color: COLORS.white,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  dayButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.tertiary,
    borderRadius: 4,
  },
  dayButtonSelected: {
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.gray,
  },
  dayButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
    fontWeight: '600',
  },
  dayButtonTextDisabled: {
    color: COLORS.disabled,
  },
  dayButtonTextSelected: {
    color: COLORS.white,
  },
  challengeContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  challengeButton: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.tertiary,
    borderRadius: 4,
    alignItems: 'center',
  },
  challengeButtonSelected: {
    backgroundColor: COLORS.tertiary,
    borderColor: COLORS.gray,
  },
  challengeIcon: {
    fontSize: 40,
    marginBottom: SPACING.xs,
  },
  challengeLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray,
    fontWeight: '600',
  },
  challengeLabelSelected: {
    color: COLORS.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  button: {
    flex: 1,
  },
  deleteButton: {
    marginTop: SPACING.md,
  },
});

export default AlarmEditScreen;
