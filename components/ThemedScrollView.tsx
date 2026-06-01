import React from 'react';
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';

type Props = ScrollViewProps & {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
};

export function ThemedScrollView({ children, contentContainerStyle, ...props }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      {...props}

    >
      {children}
    </ScrollView>
  );
}
