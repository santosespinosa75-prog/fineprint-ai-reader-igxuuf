
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { useRouter, usePathname } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 40,
  borderRadius = 25,
  bottomMargin = 20,
}: FloatingTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const activeIndex = useSharedValue(0);

  // Find the active tab index
  React.useEffect(() => {
    const currentIndex = tabs.findIndex(tab => pathname.includes(tab.name));
    if (currentIndex !== -1) {
      activeIndex.value = withSpring(currentIndex);
    }
  }, [pathname, tabs]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      activeIndex.value,
      [0, tabs.length - 1],
      [0, containerWidth - (containerWidth / tabs.length)]
    );

    return {
      transform: [{ translateX }],
    };
  });

  const handleTabPress = (route: string, index: number) => {
    activeIndex.value = withSpring(index);
    router.push(route as any);
  };

  return (
    <SafeAreaView style={[styles.container, { bottom: bottomMargin }]} edges={['bottom']}>
      <BlurView
        style={[
          styles.tabBar,
          {
            width: containerWidth,
            borderRadius,
          },
        ]}
        intensity={80}
        tint="light"
      >
        {/* Active tab indicator */}
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              width: containerWidth / tabs.length,
              borderRadius: borderRadius - 4,
            },
            animatedStyle,
          ]}
        />

        {/* Tab buttons */}
        {tabs.map((tab, index) => {
          const isActive = pathname.includes(tab.name);
          
          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tabButton, { width: containerWidth / tabs.length }]}
              onPress={() => handleTabPress(tab.route, index)}
              activeOpacity={0.7}
            >
              <IconSymbol
                name={tab.icon as any}
                size={24}
                color={isActive ? colors.primary : colors.text}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? colors.primary : colors.text,
                    fontWeight: isActive ? '600' : '500',
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.card,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  activeIndicator: {
    position: 'absolute',
    height: '80%',
    backgroundColor: colors.card,
    top: '10%',
    left: 4,
    boxShadow: '0px 2px 8px rgba(63, 81, 181, 0.3)',
    elevation: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
});
