import { useTheme } from '@/context/ThemeContext';
import { useServices } from '@/lib/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SectionTitle } from './SectionTitle';
import { SkillBadge } from './SkillBadge';

const iconMap: Record<string, string> = {
    code: 'code-slash',
    smartphone: 'phone-portrait',
    database: 'server',
    zap: 'flash',
    palette: 'color-palette',
    cloud: 'cloud',
};

export function ServicesSection() {
    const { colors } = useTheme();
    const { data: services = [], isLoading } = useServices();

    if (isLoading) {
        return (
            <View className="py-10 px-4 items-center">
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View className="py-10 px-4">
            <SectionTitle
                title="Services I Offer"
                subtitle="End-to-end solutions for your digital needs"
            />

            <View className="flex-row flex-wrap justify-center">
                {services.map((service) => {
                    const iconName = iconMap[service.icon] || 'code-slash';
                    return (
                        <View
                            key={service.id}
                            className="m-2 rounded-2xl border p-5"
                            style={{ width: '45%', minWidth: 155, backgroundColor: colors.card, borderColor: colors.border }}
                        >
                            <View className="mb-3 h-10 w-10 items-center justify-center rounded-xl"
                                style={{ backgroundColor: colors.primary + '20' }}
                            >
                                <Ionicons name={iconName as any} size={20} color={colors.primary} />
                            </View>
                            <Text className="text-base font-bold mb-1" style={{ color: colors.foreground }}>
                                {service.title}
                            </Text>
                            <Text className="text-xs leading-4 mb-3" style={{ color: colors.mutedForeground }}>
                                {service.description}
                            </Text>
                            {service.tech && service.tech.length > 0 && (
                              <View className="flex-row flex-wrap">
                                {service.tech.map((t, i) => (
                                    <SkillBadge key={i} label={t} />
                                ))}
                              </View>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
