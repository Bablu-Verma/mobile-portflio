import { ThemedSafeArea, ThemedScrollView } from '@/components/ThemedWrappers';
import { ExperienceCard } from '@/components/ExperienceCard';
import { SectionTitle } from '@/components/SectionTitle';
import { useTheme } from '@/context/ThemeContext';
import { useExperiences } from '@/lib/api';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function ExperienceScreen() {
    const router = useRouter();
    const { colors } = useTheme();
    const { data: experiences = [], isLoading } = useExperiences();

    if (isLoading) {
        return (
            <ThemedSafeArea>
                <View className="flex-1 items-center justify-center px-8">
                    <View className="h-12 w-12 rounded-full animate-spin" style={{ backgroundColor: colors.primary, opacity: 0.3 }} />
                    <Text className="mt-4 text-base" style={{ color: colors.mutedForeground }}>Loading experience...</Text>
                </View>
            </ThemedSafeArea>
        );
    }

    return (
        <ThemedSafeArea><ThemedScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
            <SectionTitle title="Work Experience" subtitle="My professional journey so far" />

            {experiences.length === 0 ? (
                <View className="items-center justify-center py-20 px-8">
                    <Text className="text-4xl mb-3">💼</Text>
                    <Text className="text-base font-semibold text-center" style={{ color: colors.foreground }}>No experience listed</Text>
                    <Text className="text-base text-center mt-1" style={{ color: colors.mutedForeground }}>Work history will appear here</Text>
                </View>
            ) : (
                <View className="relative">
                    <View className="absolute left-5 top-2 bottom-2 w-0.5" style={{ backgroundColor: colors.border }} />
                    {experiences.map((exp, index) => (
                        <Pressable key={exp.id} onPress={() => router.push(`/experience/${exp.id}`)}>
                            <ExperienceCard experience={exp} />
                        </Pressable>
                    ))}
                </View>
            )}
        </ThemedScrollView></ThemedSafeArea>
    );
}
