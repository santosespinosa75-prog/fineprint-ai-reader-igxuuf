
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const profileStats = [
    { label: 'Documents Analyzed', value: '12', icon: 'doc.text' },
    { label: 'Fees Identified', value: '8', icon: 'dollarsign.circle' },
    { label: 'Risks Flagged', value: '5', icon: 'exclamationmark.triangle' },
    { label: 'Time Saved', value: '2.5h', icon: 'clock' },
  ];

  const settingsOptions = [
    { label: 'Analysis Preferences', icon: 'slider.horizontal.3', action: () => console.log('Preferences') },
    { label: 'Document History', icon: 'doc.on.doc', action: () => console.log('History') },
    { label: 'Notifications', icon: 'bell', action: () => console.log('Notifications') },
    { label: 'Privacy Settings', icon: 'lock', action: () => console.log('Privacy') },
    { label: 'Help & Support', icon: 'questionmark.circle', action: () => console.log('Help') },
    { label: 'About', icon: 'info.circle', action: () => console.log('About') },
  ];

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <IconSymbol name="person.fill" size={48} color={colors.card} />
            </View>
            <Text style={[commonStyles.title, styles.profileName]}>
              Welcome Back!
            </Text>
            <Text style={[commonStyles.textSecondary, styles.profileSubtitle]}>
              Your AI-powered fine print assistant
            </Text>
          </View>

          {/* Stats Section */}
          <View style={[commonStyles.card, styles.statsCard]}>
            <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
              Your Analysis Summary
            </Text>
            <View style={styles.statsGrid}>
              {profileStats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <IconSymbol
                    name={stat.icon as any}
                    size={24}
                    color={colors.primary}
                  />
                  <Text style={[commonStyles.title, styles.statValue]}>
                    {stat.value}
                  </Text>
                  <Text style={[commonStyles.textSecondary, styles.statLabel]}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View style={[commonStyles.card, styles.activityCard]}>
            <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
              Recent Activity
            </Text>
            <View style={styles.activityItem}>
              <IconSymbol name="doc.text.magnifyingglass" size={20} color={colors.accent} />
              <View style={styles.activityContent}>
                <Text style={[commonStyles.text, styles.activityTitle]}>
                  Credit Card Agreement Analyzed
                </Text>
                <Text style={[commonStyles.textSecondary, styles.activityTime]}>
                  2 hours ago
                </Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.warning} />
              <View style={styles.activityContent}>
                <Text style={[commonStyles.text, styles.activityTitle]}>
                  High-Risk Terms Detected
                </Text>
                <Text style={[commonStyles.textSecondary, styles.activityTime]}>
                  1 day ago
                </Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <IconSymbol name="dollarsign.circle.fill" size={20} color={colors.secondary} />
              <View style={styles.activityContent}>
                <Text style={[commonStyles.text, styles.activityTitle]}>
                  Hidden Fees Found in Service Agreement
                </Text>
                <Text style={[commonStyles.textSecondary, styles.activityTime]}>
                  3 days ago
                </Text>
              </View>
            </View>
          </View>

          {/* Settings Section */}
          <View style={[commonStyles.card, styles.settingsCard]}>
            <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
              Settings & More
            </Text>
            {settingsOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingItem}
                onPress={option.action}
              >
                <View style={styles.settingLeft}>
                  <IconSymbol
                    name={option.icon as any}
                    size={20}
                    color={colors.textSecondary}
                  />
                  <Text style={[commonStyles.text, styles.settingLabel]}>
                    {option.label}
                  </Text>
                </View>
                <IconSymbol
                  name="chevron.right"
                  size={16}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom spacing for tab bar */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileName: {
    textAlign: 'center',
    marginBottom: 4,
  },
  profileSubtitle: {
    textAlign: 'center',
    fontSize: 16,
  },
  statsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  activityCard: {
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontWeight: '500',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
  settingsCard: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    marginLeft: 12,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
