import { ThemedSafeArea, ThemedScrollView } from '@/components/ThemedWrappers';
import { Button } from '@/components/Button';
import { useTheme } from '@/context/ThemeContext';
import { useEducation } from '@/lib/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function EducationDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { colors } = useTheme();
    const { data: educationRes, isLoading } = useEducation();

    const education = educationRes?.items?.find((edu) => edu.id === id);

    if (isLoading) {
        return (
            <ThemedSafeArea>
                <View className="flex-1 items-center justify-center px-8">
                    <View className="h-12 w-12 rounded-full animate-spin" style={{ backgroundColor: colors.primary, opacity: 0.3 }} />
                    <Text className="mt-4 text-base" style={{ color: colors.mutedForeground }}>Loading details...</Text>
                </View>
            </ThemedSafeArea>
        );
    }

    if (!education) {
        return (
            <ThemedSafeArea>
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="text-4xl mb-3">📚</Text>
                    <Text className="text-base font-semibold text-center" style={{ color: colors.foreground }}>Education not found</Text>
                    <Button onPress={() => router.back()} variant="primary" className="mt-4">Go Back</Button>
                </View>
            </ThemedSafeArea>
        );
    }

    return (
        <ThemedSafeArea><ThemedScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="px-5 pt-6">
                <Button variant="ghost" size="sm" icon="arrow-back" onPress={() => router.back()} className="mb-6 self-start">Back</Button>

                <View className="rounded-2xl border p-6 mb-6" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                    <View className="flex-row items-start">
                        <View className="h-14 w-14 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: colors.primary + '20' }}>
                            <Ionicons name="school" size={24} color={colors.primary} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-xl font-bold" style={{ color: colors.foreground }}>{education.degree}</Text>
                            <Text className="text-base font-semibold mt-1" style={{ color: colors.primary }}>{education.field}</Text>
                        </View>
                    </View>

                    <View className="mt-4 flex-row flex-wrap gap-4">
                        <View className="flex-row items-center">
                            <Ionicons name="business" size={14} color={colors.mutedForeground} />
                            <Text className="text-base ml-1" style={{ color: colors.mutedForeground }}>{education.institution}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Ionicons name="calendar" size={14} color={colors.mutedForeground} />
                            <Text className="text-base ml-1" style={{ color: colors.mutedForeground }}>
                                {education.startDate} - {education.endDate}
                            </Text>
                        </View>
                    </View>

                    {education.description && (
                        <Text className="text-base mt-4 leading-6" style={{ color: colors.mutedForeground }}>
                            {education.description}
                        </Text>
                    )}
                </View>
            </View>
        </ThemedScrollView></ThemedSafeArea>
    );
}
