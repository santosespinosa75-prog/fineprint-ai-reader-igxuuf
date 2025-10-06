
import React from "react";
import { Stack, Link } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles, buttonStyles } from "@/styles/commonStyles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Fine Print AI",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          }}
        />
      )}
      
      <View style={styles.container}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <IconSymbol name="brain" size={64} color={colors.primary} />
          </View>
          
          <Text style={[commonStyles.title, styles.heroTitle]}>
            Fine Print AI Analyzer
          </Text>
          
          <Text style={[commonStyles.textSecondary, styles.heroDescription]}>
            Never miss important details again. Our AI reads and summarizes fine print, 
            highlighting fees, risks, and key terms in plain language.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <IconSymbol name="dollarsign.circle.fill" size={32} color={colors.secondary} />
            <View style={styles.featureContent}>
              <Text style={[commonStyles.text, styles.featureTitle]}>
                Identify Hidden Fees
              </Text>
              <Text style={[commonStyles.textSecondary, styles.featureDescription]}>
                Automatically detect and highlight all fees and charges
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <IconSymbol name="exclamationmark.triangle.fill" size={32} color={colors.warning} />
            <View style={styles.featureContent}>
              <Text style={[commonStyles.text, styles.featureTitle]}>
                Spot Risks & Obligations
              </Text>
              <Text style={[commonStyles.textSecondary, styles.featureDescription]}>
                Understand your commitments and potential risks
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <IconSymbol name="clock.fill" size={32} color={colors.accent} />
            <View style={styles.featureContent}>
              <Text style={[commonStyles.text, styles.featureTitle]}>
                Track Important Deadlines
              </Text>
              <Text style={[commonStyles.textSecondary, styles.featureDescription]}>
                Never miss cancellation periods or renewal dates
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <IconSymbol name="checkmark.circle.fill" size={32} color={colors.success} />
            <View style={styles.featureContent}>
              <Text style={[commonStyles.text, styles.featureTitle]}>
                Plain Language Summaries
              </Text>
              <Text style={[commonStyles.textSecondary, styles.featureDescription]}>
                Complex legal terms explained in simple language
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <Link href="/(tabs)/fine-print" asChild>
            <TouchableOpacity style={[buttonStyles.primary, styles.ctaButton]}>
              <IconSymbol name="doc.text.magnifyingglass" size={20} color={colors.card} />
              <Text style={[commonStyles.buttonText, styles.ctaButtonText]}>
                Start Analyzing Fine Print
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Text style={[commonStyles.textSecondary, styles.ctaSubtext]}>
            Upload documents, take photos, or paste text to get started
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  heroTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 28,
  },
  heroDescription: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresSection: {
    flex: 1,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  ctaSection: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 100,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    marginBottom: 12,
  },
  ctaButtonText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  ctaSubtext: {
    textAlign: 'center',
    fontSize: 14,
  },
});
