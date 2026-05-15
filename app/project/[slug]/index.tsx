import { SkillBadge } from '@/components/SkillBadge';
import { useTheme } from '@/context/ThemeContext';
import { useProjectBySlug } from '@/lib/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProjectDetailScreen() {
    const router = useRouter();
    const { slug } = useLocalSearchParams<{ slug: string }>();
    const { colors } = useTheme();
    const { data: project, isLoading } = useProjectBySlug(slug || '');

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <StatusBar style={colors.background === '#0d0d0f' ? 'light' : 'dark'} />
                <View className="flex-1 items-center justify-center">
                    <View className="h-12 w-12 rounded-full animate-spin" style={{ backgroundColor: colors.primary, opacity: 0.3 }} />
                    <Text className="mt-4 text-base" style={{ color: colors.mutedForeground }}>Loading project...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!project) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <StatusBar style={colors.background === '#0d0d0f' ? 'light' : 'dark'} />
                <View className="flex-1 items-center justify-center px-8">
                    <Text className="text-4xl mb-3">🔍</Text>
                    <Text className="text-base font-semibold text-center" style={{ color: colors.foreground }}>Project not found</Text>
                    <Pressable onPress={() => router.back()} className="mt-4 px-6 py-3 rounded-xl" style={{ backgroundColor: colors.primary }}>
                        <Text className="text-white font-semibold">Go Back</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    const screenWidth = Dimensions.get('window').width;

    const SectionBlock = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
        <View className="mb-6">
            <View className="flex-row items-center mb-3">
                <View className="h-8 w-8 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: colors.primary + '20' }}>
                    <Ionicons name={icon as any} size={16} color={colors.primary} />
                </View>
                <Text className="text-base font-bold" style={{ color: colors.foreground }}>{title}</Text>
            </View>
            {children}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar style={colors.background === '#0d0d0f' ? 'light' : 'dark'} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                <View className="relative">
                    <Image source={{ uri: project.image }} style={{ width: screenWidth, height: 220 }} resizeMode="cover" />
                    <View className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} />
                    <Pressable onPress={() => router.back()} className="absolute top-12 left-5 p-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        <Ionicons name="arrow-back" size={20} color="white" />
                    </Pressable>
                </View>

                <View className="px-5 -mt-6">
                    <View className="rounded-2xl border p-6" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                        <Text className="text-2xl font-bold" style={{ color: colors.foreground }}>{project.title}</Text>
                        <Text className="text-base mt-2 leading-6" style={{ color: colors.mutedForeground }}>{project.overview}</Text>

                        {project.liveUrl && project.liveUrl !== '#' && (
                            <Pressable className="mt-4 flex-row items-center self-start px-4 py-2 rounded-xl" style={{ backgroundColor: colors.primary }}>
                                <Ionicons name="open-outline" size={16} color="white" />
                                <Text className="ml-2 text-base font-semibold text-white">View Live</Text>
                            </Pressable>
                        )}
                    </View>

                    <View className="mt-6">
                        <SectionBlock title="Tech Stack" icon="code-slash">
                            <View className="rounded-2xl border p-4 flex-row flex-wrap" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                                {project.tags.map((tag, i) => (
                                    <SkillBadge key={i} label={tag} />
                                ))}
                            </View>
                        </SectionBlock>

                        {project.challenges.length > 0 && (
                            <SectionBlock title="Challenges" icon="alert-circle">
                                <View className="rounded-2xl border p-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                                    {project.challenges.map((item, i) => (
                                        <View key={i} className="flex-row items-start mb-3 last:mb-0">
                                            <View className="h-1.5 w-1.5 rounded-full mt-2 mr-3" style={{ backgroundColor: colors.destructive }} />
                                            <Text className="text-base flex-1 leading-5" style={{ color: colors.foreground }}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </SectionBlock>
                        )}

                        {project.solutions.length > 0 && (
                            <SectionBlock title="Solutions" icon="checkmark-circle">
                                <View className="rounded-2xl border p-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                                    {project.solutions.map((item, i) => (
                                        <View key={i} className="flex-row items-start mb-3 last:mb-0">
                                            <View className="h-1.5 w-1.5 rounded-full mt-2 mr-3" style={{ backgroundColor: colors.primary }} />
                                            <Text className="text-base flex-1 leading-5" style={{ color: colors.foreground }}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </SectionBlock>
                        )}

                        {project.results.length > 0 && (
                            <SectionBlock title="Results" icon="trending-up">
                                <View className="rounded-2xl border p-4" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                                    {project.results.map((item, i) => (
                                        <View key={i} className="flex-row items-start mb-3 last:mb-0">
                                            <Ionicons name="star" size={14} color={colors.accent} style={{ marginTop: 2, marginRight: 8 }} />
                                            <Text className="text-base flex-1 leading-5" style={{ color: colors.foreground }}>{item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </SectionBlock>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
