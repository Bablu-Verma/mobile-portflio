import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type Props = {
    label: string;
};

export function SkillBadge({ label }: Props) {
    const { colors } = useTheme();
    return (
        <View className="rounded-lg border px-3 py-1.5 m-1"
            style={{ borderColor: colors.border, backgroundColor: colors.secondary }}
        >
            <Text className="text-xs font-medium" style={{ color: colors.primary }}>{label}</Text>
        </View>
    );
}