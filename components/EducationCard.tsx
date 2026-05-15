import { useTheme } from '@/context/ThemeContext';
import type { Education } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    education: Education;
};

export function EducationCard({ education }: Props) {
    const { colors } = useTheme();
    return (
        <View className="mb-4 rounded-2xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <View className="flex-row items-start">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: colors.primary + '20' }}
                >
                    <Ionicons name="school" size={18} color={colors.primary} />
                </View>
                <View className="flex-1">
                    <Text className="text-base font-bold" style={{ color: colors.foreground }}>
                        {education.degree}
                    </Text>
                    <Text className="text-base" style={{ color: colors.mutedForeground }}>
                        {education.institution}
                    </Text>
                    <Text className="text-xs mt-1" style={{ color: colors.mutedForeground }}>
                        {education.startDate} - {education.endDate}
                    </Text>
                    <Text className="text-base mt-2 leading-5" style={{ color: colors.mutedForeground }}>
                        {education.description}
                    </Text>
                </View>
            </View>
        </View>
    );
}