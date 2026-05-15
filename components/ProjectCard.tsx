import { useTheme } from '@/context/ThemeContext';
import type { Project } from '@/types';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SkillBadge } from './SkillBadge';

type Props = {
    project: Project;
    onPress?: () => void;
};

export function ProjectCard({ project, onPress }: Props) {
    const { colors } = useTheme();
    return (
        <Pressable
            onPress={onPress}
            className="mb-4 rounded-2xl border border-gray-200  overflow-hidden"
            style={({ pressed }) => ({
                backgroundColor: colors.card,
                borderColor: colors.border,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
        >
            <Image
                source={{ uri: project.image }}
                className="w-full"
                style={{ height: 180 }}
                resizeMode="cover"
            />
            <View className="p-4">
                <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-bold flex-1" style={{ color: colors.foreground }}>
                        {project.title}
                    </Text>
                    {project.featured && (
                        <View className="px-2 py-1 rounded-md" style={{ backgroundColor: colors.accent + '20' }}>
                            <Text className="text-xs font-semibold" style={{ color: colors.accent }}>Featured</Text>
                        </View>
                    )}
                </View>
                <Text className="text-base mb-3" style={{ color: colors.mutedForeground }}>
                    {project.shortDescription}
                </Text>
                <View className="flex-row flex-wrap">
                    {project.tags.slice(0, 3).map((t, i) => (
                        <SkillBadge key={i} label={t} />
                    ))}
                    {project.tags.length > 3 && (
                        <View className="rounded-lg border px-2 py-1 m-1" style={{ borderColor: colors.border }}>
                            <Text className="text-xs" style={{ color: colors.mutedForeground }}>
                                +{project.tags.length - 3}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    );
}
