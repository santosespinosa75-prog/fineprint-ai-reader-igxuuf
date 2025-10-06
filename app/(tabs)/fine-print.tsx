
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import * as ImagePicker from 'expo-image-picker';

interface SummaryItem {
  type: 'fee' | 'obligation' | 'risk' | 'benefit' | 'deadline' | 'cancellation';
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
}

interface UserPreferences {
  prioritizeFees: boolean;
  prioritizeRisks: boolean;
  prioritizeCancellation: boolean;
  prioritizeDeadlines: boolean;
}

export default function FinePrintScreen() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    prioritizeFees: true,
    prioritizeRisks: true,
    prioritizeCancellation: true,
    prioritizeDeadlines: false,
  });
  const [showPreferences, setShowPreferences] = useState(false);

  const mockAIProcessing = async (text: string): Promise<SummaryItem[]> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI analysis results
    const mockResults: SummaryItem[] = [
      {
        type: 'fee',
        title: 'Monthly Service Fee',
        description: 'A $9.99 monthly fee will be charged to your account starting from the second month.',
        importance: 'high',
      },
      {
        type: 'cancellation',
        title: 'Cancellation Policy',
        description: 'You can cancel anytime, but must provide 30 days written notice to avoid next month\'s charge.',
        importance: 'high',
      },
      {
        type: 'risk',
        title: 'Data Usage Risk',
        description: 'Your personal data may be shared with third-party partners for marketing purposes.',
        importance: 'medium',
      },
      {
        type: 'deadline',
        title: 'Promotional Rate Expires',
        description: 'The introductory 0% APR rate expires after 12 months and will increase to 24.99% APR.',
        importance: 'high',
      },
      {
        type: 'obligation',
        title: 'Minimum Usage Requirement',
        description: 'You must use the service at least once every 90 days to maintain your account.',
        importance: 'low',
      },
    ];

    // Filter based on user preferences
    return mockResults.filter(item => {
      if (item.type === 'fee' && !preferences.prioritizeFees) return false;
      if (item.type === 'risk' && !preferences.prioritizeRisks) return false;
      if (item.type === 'cancellation' && !preferences.prioritizeCancellation) return false;
      if (item.type === 'deadline' && !preferences.prioritizeDeadlines) return false;
      return true;
    });
  };

  const handleProcessText = async () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter some text to analyze');
      return;
    }

    setIsProcessing(true);
    try {
      const results = await mockAIProcessing(inputText);
      setSummary(results);
    } catch (error) {
      console.log('Error processing text:', error);
      Alert.alert('Error', 'Failed to process the text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera roll permissions to upload documents.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      Alert.alert('Feature Coming Soon', 'OCR text extraction from images will be available in a future update.');
    }
  };

  const handleCameraPicker = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      Alert.alert('Feature Coming Soon', 'OCR text extraction from camera will be available in a future update.');
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fee': return 'dollarsign.circle.fill';
      case 'risk': return 'exclamationmark.triangle.fill';
      case 'cancellation': return 'xmark.circle.fill';
      case 'deadline': return 'clock.fill';
      case 'obligation': return 'checkmark.circle.fill';
      case 'benefit': return 'star.fill';
      default: return 'info.circle.fill';
    }
  };

  const togglePreference = (key: keyof UserPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={[commonStyles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          <Text style={[commonStyles.title, styles.headerTitle]}>
            AI Fine Print Analyzer
          </Text>
          <Text style={[commonStyles.textSecondary, styles.subtitle]}>
            Upload or paste fine print text to get a clear summary of important terms
          </Text>

          {/* Input Methods */}
          <View style={[commonStyles.card, styles.inputCard]}>
            <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
              Input Method
            </Text>
            
            <View style={styles.inputMethodsContainer}>
              <TouchableOpacity
                style={[buttonStyles.outline, styles.inputMethodButton]}
                onPress={handleImagePicker}
              >
                <IconSymbol name="photo" size={20} color={colors.primary} />
                <Text style={[commonStyles.buttonTextOutline, styles.inputMethodText]}>
                  Upload Image
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[buttonStyles.outline, styles.inputMethodButton]}
                onPress={handleCameraPicker}
              >
                <IconSymbol name="camera" size={20} color={colors.primary} />
                <Text style={[commonStyles.buttonTextOutline, styles.inputMethodText]}>
                  Take Photo
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
              <View style={commonStyles.divider} />
              <Text style={[commonStyles.textSecondary, styles.dividerText]}>or</Text>
              <View style={commonStyles.divider} />
            </View>

            <TextInput
              style={[commonStyles.input, styles.textInput]}
              placeholder="Paste fine print text here..."
              placeholderTextColor={colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* User Preferences */}
          <View style={[commonStyles.card, styles.preferencesCard]}>
            <TouchableOpacity
              style={styles.preferencesHeader}
              onPress={() => setShowPreferences(!showPreferences)}
            >
              <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
                Analysis Preferences
              </Text>
              <IconSymbol
                name={showPreferences ? 'chevron.up' : 'chevron.down'}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {showPreferences && (
              <View style={styles.preferencesContent}>
                {Object.entries(preferences).map(([key, value]) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.preferenceItem}
                    onPress={() => togglePreference(key as keyof UserPreferences)}
                  >
                    <Text style={commonStyles.text}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Prioritize', '')}
                    </Text>
                    <View style={[styles.checkbox, value && styles.checkboxChecked]}>
                      {value && (
                        <IconSymbol name="checkmark" size={16} color={colors.card} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Process Button */}
          <TouchableOpacity
            style={[buttonStyles.primary, styles.processButton]}
            onPress={handleProcessText}
            disabled={isProcessing || !inputText.trim()}
          >
            {isProcessing ? (
              <ActivityIndicator color={colors.card} />
            ) : (
              <>
                <IconSymbol name="brain" size={20} color={colors.card} />
                <Text style={[commonStyles.buttonText, styles.processButtonText]}>
                  Analyze Fine Print
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Summary Results */}
          {summary.length > 0 && (
            <View style={[commonStyles.card, styles.summaryCard]}>
              <Text style={[commonStyles.subtitle, styles.sectionTitle]}>
                Key Findings
              </Text>
              
              {summary.map((item, index) => (
                <View key={index} style={styles.summaryItem}>
                  <View style={styles.summaryHeader}>
                    <View style={styles.summaryIconContainer}>
                      <IconSymbol
                        name={getTypeIcon(item.type)}
                        size={20}
                        color={getImportanceColor(item.importance)}
                      />
                    </View>
                    <View style={styles.summaryTitleContainer}>
                      <Text style={[commonStyles.text, styles.summaryTitle]}>
                        {item.title}
                      </Text>
                      <View style={[
                        styles.importanceBadge,
                        { backgroundColor: getImportanceColor(item.importance) }
                      ]}>
                        <Text style={[commonStyles.badgeText, styles.importanceText]}>
                          {item.importance.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={[commonStyles.textSecondary, styles.summaryDescription]}>
                    {item.description}
                  </Text>
                </View>
              ))}
            </View>
          )}

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
  headerTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  inputCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  inputMethodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputMethodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    paddingVertical: 12,
  },
  inputMethodText: {
    marginLeft: 8,
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  textInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  preferencesCard: {
    marginBottom: 16,
  },
  preferencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferencesContent: {
    marginTop: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  processButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  processButtonText: {
    marginLeft: 8,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  summaryIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  summaryTitleContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  importanceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  importanceText: {
    fontSize: 10,
  },
  summaryDescription: {
    marginLeft: 32,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
});
