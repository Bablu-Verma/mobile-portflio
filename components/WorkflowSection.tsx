import { useTheme } from '@/context/ThemeContext';
import { useWorkflowSteps } from '@/lib/api';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SectionTitle } from './SectionTitle';

export function WorkflowSection() {
    const { colors } = useTheme();
    const { data: workflowSteps = [], isLoading } = useWorkflowSteps();

    if (isLoading) {
        return (
            <View className="py-10 px-5 items-center">
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View className="py-10 px-5">
            <SectionTitle
                title="How I Work"
                subtitle="My development process from idea to launch"
            />

            {workflowSteps.map((step, index) => (
                <View key={step.id} className="flex-row items-start mb-6">
                    <View className="items-center mr-4">
                        <View className="h-10 w-10 rounded-full items-center justify-center"
                            style={{ backgroundColor: colors.primary }}
                        >
                            <Text className="text-base font-bold text-white">{step.number}</Text>
                        </View>
                        {index < workflowSteps.length - 1 && (
                            <View className="w-0.5 flex-1 mt-1"
                                style={{ backgroundColor: colors.border, minHeight: 30 }}
                            />
                        )}
                    </View>

                    <View className="flex-1 pt-1 pb-2">
                        <Text className="text-base font-bold mb-1" style={{ color: colors.foreground }}>
                            {step.title}
                        </Text>
                        <Text className="text-base leading-5" style={{ color: colors.mutedForeground }}>
                            {step.description}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}
