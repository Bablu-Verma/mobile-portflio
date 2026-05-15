import { useTheme } from '@/context/ThemeContext';
import { useExperiences } from '@/lib/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExperienceDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { colors } = useTheme();
    const { data: experiences = [], isLoading } = useExperiences();

    const experience = experiences.find((exp) => exp.id === id);

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <StatusBar style={colors.background === '#0d0d0f' ? 'light' : 'dark'} />
                <View className="flex-1 items-center justify-center">
                    <View className="h-12 w-12 rounded-full animate-spin" style={{ backgroundColor: colors.primary, opacity: 0.3 }} />
                    <Text className="mt-4 text-base" style={{ color: colors.mutedForeground }}>Loading details...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!experience) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <StatusBar style={colors.background === '#0d0d0f' ? 'light' : 'dark'} />
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="text-4xl mb-3">🔍</Text>
                    <Text className="text-base font-semibold text-center" style={{ color: colors.foreground }}>Experience not found</Text>
                    <Pressable onPress={() => router.back()} className="mt-4 px-6 py-3 rounded-xl" style={{ backgroundColor: colors.primary }}>
                        <Text className="text-white font-semibold">Go Back</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    const SectionBlock = ({ title, icon, items }: { title: string; icon: string; items: string[] }) => (
        <View className="mb-6">
            <View className="flex-row items-center mb-3">
                <View className="h-8 w-8 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: colors.primary + '20' }}>
                    <Ionicons name={icon as any} size={16} color={colors.primary} />
                </View>
                <Text className="text-base font-bold" style={{ color: colors.foreground }}>{title}</Text>
            </View>
            <View className="rounded-2xl border p-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                {items.map((item, i) => (
                    <View key={i} className="flex-row items-start mb-3 last:mb-0">
                        <View className="h-1.5 w-1.5 rounded-full mt-2 mr-3" style={{ backgroundColor: colors.primary }} />
                        <Text className="text-base flex-1 leading-5" style={{ color: colors.foreground }}>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar style={colors.background === '#0d0d0f' ? 'light' : 'dark'} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                <View className="px-5 pt-6">
                    <Pressable onPress={() => router.back()} className="mb-6 flex-row items-center">
                        <Ionicons name="arrow-back" size={20} color={colors.foreground} />
                        <Text className="ml-2 text-base font-semibold" style={{ color: colors.foreground }}>Back</Text>
                    </Pressable>

                    <View className="rounded-2xl border p-6 mb-6" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                        <View className="flex-row items-start">
                            <View className="h-14 w-14 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: colors.primary + '20' }}>
                                <Ionicons name="briefcase" size={24} color={colors.primary} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xl font-bold" style={{ color: colors.foreground }}>{experience.role}</Text>
                                <Text className="text-base font-semibold mt-1" style={{ color: colors.primary }}>{experience.company}</Text>
                            </View>
                        </View>

                        <View className="mt-4 flex-row flex-wrap gap-4">
                            <View className="flex-row items-center">
                                <Ionicons name="location" size={14} color={colors.mutedForeground} />
                                <Text className="text-base ml-1" style={{ color: colors.mutedForeground }}>{experience.location}</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Ionicons name="calendar" size={14} color={colors.mutedForeground} />
                                <Text className="text-base ml-1" style={{ color: colors.mutedForeground }}>
                                    {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                                </Text>
                            </View>
                        </View>

                        <Text className="text-base mt-4 leading-6" style={{ color: colors.mutedForeground }}>
                            {experience.description}
                        </Text>
                    </View>

                    {experience.responsibilities.length > 0 && (
                        <SectionBlock title="Responsibilities" icon="list" items={experience.responsibilities} />
                    )}

                    {experience.achievements.length > 0 && (
                        <SectionBlock title="Achievements" icon="trophy" items={experience.achievements} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
