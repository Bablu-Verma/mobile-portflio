import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  hideStatusBar?: boolean;
};

export function ThemedSafeArea({ children, className, style, hideStatusBar = false }: Props) {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: colors.background }, style]}
      className={className}
    >
      {!hideStatusBar && <StatusBar style={colors.background === '#0d0d0f' ? 'light' : 'dark'} />}
      {children}
    </SafeAreaView>
  );
}
