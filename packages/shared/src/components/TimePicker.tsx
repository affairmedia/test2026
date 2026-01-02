import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/colors';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [hours, minutes] = value.split(':').map(Number);

  const hoursList = Array.from({ length: 24 }, (_, i) => i);
  const minutesList = Array.from({ length: 60 }, (_, i) => i);

  const HourItem = ({ hour }: { hour: number }) => (
    <TouchableOpacity
      style={[
        styles.pickerItem,
        hours === hour && styles.pickerItemSelected,
      ]}
      onPress={() => onChange(`${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`}
    >
      <Text
        style={[
          styles.pickerItemText,
          hours === hour && styles.pickerItemTextSelected,
        ]}
      >
        {String(hour).padStart(2, '0')}
      </Text>
    </TouchableOpacity>
  );

  const MinuteItem = ({ minute }: { minute: number }) => (
    <TouchableOpacity
      style={[
        styles.pickerItem,
        minutes === minute && styles.pickerItemSelected,
      ]}
      onPress={() => onChange(`${String(hours).padStart(2, '0')}:${String(minute).padStart(2, '0')}`}
    >
      <Text
        style={[
          styles.pickerItemText,
          minutes === minute && styles.pickerItemTextSelected,
        ]}
      >
        {String(minute).padStart(2, '0')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Heures</Text>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            snapToInterval={60}
            decelerationRate="fast"
          >
            <View style={styles.padding} />
            {hoursList.map((hour) => (
              <HourItem key={hour} hour={hour} />
            ))}
            <View style={styles.padding} />
          </ScrollView>
        </View>

        <Text style={styles.separator}>:</Text>

        <View style={styles.column}>
          <Text style={styles.columnHeader}>Minutes</Text>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            snapToInterval={60}
            decelerationRate="fast"
          >
            <View style={styles.padding} />
            {minutesList.map((minute) => (
              <MinuteItem key={minute} minute={minute} />
            ))}
            <View style={styles.padding} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  pickerContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  column: {
    flex: 1,
  },
  columnHeader: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
    textAlign: 'center',
    paddingVertical: SPACING.sm,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  padding: {
    height: 60,
  },
  separator: {
    fontSize: FONT_SIZES.huge,
    color: COLORS.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: SPACING.sm,
  },
  pickerItem: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  pickerItemSelected: {
    backgroundColor: COLORS.tertiary,
  },
  pickerItemText: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.gray,
    fontWeight: '600',
  },
  pickerItemTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default TimePicker;
