import { useTheme } from '@/context/ThemeContext';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    title: string;
    subtitle?: string;
    link?: string;
    linkText?: string;
};

export function SectionTitle({ title, subtitle, link, linkText }: Props) {
    const { colors } = useTheme();

    return (
        <View className="mb-6 px-4">
            <View className="flex-row items-center justify-between">


                <View style={{ width: 60 }} />
                <Text
                    className="text-2xl font-bold text-center flex-1"
                    style={{ color: colors.foreground }}
                >
                    {title}
                </Text>


                {link ? (
                    <Link href={link as any}>
                        <Text
                            className="text-base font-medium"
                            style={{ color: colors.primary }}
                        >
                            {linkText || 'View All'}
                        </Text>
                    </Link>
                ) : (
                    <View style={{ width: 60 }} />
                )}
            </View>

            <View
                className="mt-2 h-1 w-12 self-center rounded-full"
                style={{ backgroundColor: colors.primary }}
            />

            {subtitle && (
                <Text
                    className="mt-3 text-center text-base leading-5"
                    style={{ color: colors.mutedForeground }}
                >
                    {subtitle}
                </Text>
            )}
        </View>
    );
}