import React, { ReactNode } from 'react';
import { View as RNView, Text as RNText, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type ViewProps = {
    children?: ReactNode;
    className?: string;
    style?: StyleProp<ViewStyle>;
    bgCard?: boolean;
    bgSecondary?: boolean;
    bgMuted?: boolean;
    bgPrimary?: boolean;
    bgBackground?: boolean;
    bgTransparent?: boolean;
    border?: boolean;
    lightBorder?: boolean;
    darkBorder?: boolean;
};

export function ThemedView({ children, className, style, ...props }: ViewProps) {
    const { colors, theme } = useTheme();
    
    const getBackgroundColor = () => {
        if (props.bgCard) return colors.card;
        if (props.bgSecondary) return colors.secondary;
        if (props.bgMuted) return colors.muted;
        if (props.bgPrimary) return colors.primary;
        if (props.bgBackground) return colors.background;
        if (props.bgTransparent) return 'transparent';
        return undefined;
    };

    const getBorderColor = () => {
        if (props.border) return colors.border;
        if (props.lightBorder) return theme === 'dark' ? colors.border : '#e4e4e7';
        if (props.darkBorder) return theme === 'dark' ? '#e4e4e7' : colors.border;
        return undefined;
    };

    return (
        <RNView 
            style={[
                style, 
                { 
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                }
            ]}
            className={className}
        >
            {children}
        </RNView>
    );
}

type TextColorProps = {
    children?: ReactNode;
    className?: string;
    style?: StyleProp<TextStyle>;
    primary?: boolean;
    muted?: boolean;
    secondary?: boolean;
    accent?: boolean;
    destructive?: boolean;
    light?: boolean;
    dark?: boolean;
};

export function ThemedText({ children, className, style, ...props }: TextColorProps) {
    const { colors, theme } = useTheme();
    
    const getColor = () => {
        if (props.primary) return colors.primary;
        if (props.muted) return colors.mutedForeground;
        if (props.secondary) return colors.secondaryForeground;
        if (props.accent) return colors.accent;
        if (props.destructive) return colors.destructive;
        if (props.light) return theme === 'dark' ? colors.foreground : '#0d0d0f';
        if (props.dark) return theme === 'dark' ? '#0d0d0f' : colors.foreground;
        return colors.foreground;
    };

    return (
        <RNText 
            style={[style, { color: getColor() }]}
            className={className}
        >
            {children}
        </RNText>
    );
}