import { ThemedSafeArea, ThemedScrollView } from '@/components/ThemedWrappers';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionTitle } from '@/components/SectionTitle';
import { useTheme } from '@/context/ThemeContext';
import { useProjects } from '@/lib/api';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function ProjectsScreen() {
    const router = useRouter();
    const { colors } = useTheme();
    const { data: projects = [], isLoading } = useProjects();

    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);

    if (isLoading) {
        return (
            <ThemedSafeArea>
                <View className="flex-1 items-center justify-center px-8">
                    <View className="h-12 w-12 rounded-full animate-spin" style={{ backgroundColor: colors.primary, opacity: 0.3 }} />
                    <Text className="mt-4 text-base" style={{ color: colors.mutedForeground }}>Loading projects...</Text>
                </View>
            </ThemedSafeArea>
        );
    }

    return (
        <ThemedSafeArea><ThemedScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
            <SectionTitle title="My Projects" subtitle="Real products I've built and shipped" />

            {projects.length === 0 ? (
                <View className="items-center justify-center py-20 px-8">
                    <Text className="text-4xl mb-3">🚀</Text>
                    <Text className="text-base font-semibold text-center" style={{ color: colors.foreground }}>No projects yet</Text>
                    <Text className="text-base text-center mt-1" style={{ color: colors.mutedForeground }}>Check back soon for updates</Text>
                </View>
            ) : (
                <>
                    {featured.length > 0 && (
                        <View className="mb-6">
                            <Text className="text-lg font-bold mb-3" style={{ color: colors.foreground }}>
                                ⭐ Featured
                            </Text>
                            {featured.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onPress={() => router.push(`/project/${project.slug}`)}
                                />
                            ))}
                        </View>
                    )}

                    {others.length > 0 && (
                        <View>
                            <Text className="text-lg font-bold mb-3" style={{ color: colors.foreground }}>
                                All Projects
                            </Text>
                            {others.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onPress={() => router.push(`/project/${project.slug}`)}
                                />
                            ))}
                        </View>
                    )}
                </>
            )}
        </ThemedScrollView></ThemedSafeArea>
    );
}
