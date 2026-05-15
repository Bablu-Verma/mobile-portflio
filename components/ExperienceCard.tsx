import { useTheme } from '@/context/ThemeContext';
import type { Experience } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    experience: Experience;
};

export function ExperienceCard({ experience }: Props) {
    const { colors } = useTheme();

    return (
        <View className="mb-6 ml-2">
            <View className="flex-row items-start">
                <View className="mr-4 mt-1 z-10">
                    <View
                        className="h-10 w-10 rounded-full items-center justify-center border-4"
                        style={{ backgroundColor: colors.card, borderColor: colors.primary }}
                    >
                        <Ionicons name="briefcase" size={16} color={colors.primary} />
                    </View>
                </View>
                <View className="flex-1 rounded-2xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                    <Text className="text-base font-bold" style={{ color: colors.foreground }}>
                        {experience.role}
                    </Text>
                    <Text className="text-base font-semibold mt-1" style={{ color: colors.primary }}>
                        {experience.company}
                    </Text>
                    <View className="flex-row items-center mt-2 flex-wrap gap-2">
                        <View className="flex-row items-center">
                            <Ionicons name="location" size={12} color={colors.mutedForeground} />
                            <Text className="text-xs ml-1" style={{ color: colors.mutedForeground }}>
                                {experience.location}
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <Ionicons name="calendar" size={12} color={colors.mutedForeground} />
                            <Text className="text-xs ml-1" style={{ color: colors.mutedForeground }}>
                                {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-base mt-3 leading-5" style={{ color: colors.mutedForeground }}>
                        {experience.description}
                    </Text>
                    <View className="mt-3 flex-row items-center" style={{ gap: 4 }}>
                        <Text className="text-xs font-semibold" style={{ color: colors.primary }}>
                            View Details
                        </Text>
                        <Ionicons name="arrow-forward" size={12} color={colors.primary} />
                    </View>
                </View>
            </View>
        </View>
    );
}
