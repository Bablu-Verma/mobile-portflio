import { useTheme } from '@/context/ThemeContext';
import type { Project } from '@/types';
import React, { useRef } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { SkillBadge } from './SkillBadge';

type Props = {
    project: Project;
    onPress?: () => void;
};

export function ProjectCard({ project, onPress }: Props) {
    const { colors } = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
            <Pressable
                onPress={onPress}
                onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, friction: 8, tension: 120 }).start()}
                onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5, tension: 40 }).start()}
                className="mb-4 rounded-2xl border overflow-hidden"
                style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                }}
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
        </Animated.View>
    );
}
