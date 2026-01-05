import React from 'react';
import { View, StyleSheet, ScrollView, Switch } from 'react-native';
import { Header } from '../components/organisms/Header';
import { ListItem } from '../components/molecules/ListItem';
import { Typography } from '../components/atoms/Typography';
import { colors } from '../utils/colors';
import { spacing } from '../utils/spacing';
import { User, Bell, Shield, HelpCircle, ChevronRight } from 'lucide-react-native';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Settings" />
      
      <ScrollView>
        <View style={styles.section}>
          <Typography variant="label" color={colors.primary} style={styles.sectionTitle}>
            ACCOUNT
          </Typography>
          <ListItem
            title="Profile"
            subtitle="John Doe, Admin"
            leftContent={<User size={22} color={colors.text.secondary} />}
            rightContent={<ChevronRight size={20} color={colors.text.secondary} />}
          />
        </View>

        <View style={styles.section}>
          <Typography variant="label" color={colors.primary} style={styles.sectionTitle}>
            PREFERENCES
          </Typography>
          <ListItem
            title="Notifications"
            leftContent={<Bell size={22} color={colors.text.secondary} />}
            rightContent={<Switch value={true} trackColor={{ true: colors.primary }} />}
          />
          <ListItem
            title="Security"
            leftContent={<Shield size={22} color={colors.text.secondary} />}
            rightContent={<ChevronRight size={20} color={colors.text.secondary} />}
          />
        </View>

        <View style={styles.section}>
          <Typography variant="label" color={colors.primary} style={styles.sectionTitle}>
            SUPPORT
          </Typography>
          <ListItem
            title="Help Center"
            leftContent={<HelpCircle size={22} color={colors.text.secondary} />}
            rightContent={<ChevronRight size={20} color={colors.text.secondary} />}
          />
        </View>

        <View style={styles.footer}>
          <Typography variant="caption" color={colors.text.secondary}>
            Smart Stock v1.0.0
          </Typography>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  section: {
    backgroundColor: colors.background,
    marginTop: spacing.m,
  },
  sectionTitle: {
    paddingHorizontal: spacing.m,
    paddingTop: spacing.m,
    paddingBottom: spacing.s,
    backgroundColor: colors.surface,
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  }
});
