import { useTheme } from '@/context/ThemeContext';
import { useTestimonials } from '@/lib/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Text, useWindowDimensions, View } from 'react-native';
import { SectionTitle } from './SectionTitle';

export function TestimonialCarousel() {
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const cardWidth = width - 60;
    const [activeIndex, setActiveIndex] = useState(0);
    const { data: testimonials = [], isLoading } = useTestimonials();

    if (isLoading) {
        return (
            <View className="py-10 items-center">
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View className="py-10">
            <SectionTitle
                title="What Clients Say"
                subtitle="Feedback from people I've worked with"
            />

            <FlatList
                data={testimonials}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={cardWidth + 16}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 30 }}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / (cardWidth + 16));
                    setActiveIndex(index);
                }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        className="rounded-2xl border p-6 mr-4"
                        style={{ width: cardWidth, backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <Ionicons name="chatbubble-ellipses" size={24} color={colors.primary} style={{ opacity: 0.5 }} />
                        <Text className="text-base leading-6 mt-3 mb-4" style={{ color: colors.foreground }}>
                            &ldquo;{item.content}&rdquo;
                        </Text>
                        <View className="flex-row items-center">
                            <View className="h-10 w-10 rounded-full items-center justify-center"
                                style={{ backgroundColor: colors.primary + '20' }}
                            >
                                <Text className="text-base font-bold" style={{ color: colors.primary }}>
                                    {item.name.charAt(0)}
                                </Text>
                            </View>
                            <View className="ml-3">
                                <Text className="text-base font-bold" style={{ color: colors.foreground }}>
                                    {item.name}
                                </Text>
                                <Text className="text-xs" style={{ color: colors.mutedForeground }}>
                                    {item.role}, {item.company}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            />

            <View className="flex-row justify-center mt-4">
                {testimonials.map((_, i) => (
                    <View
                        key={i}
                        className="rounded-full mx-1"
                        style={{
                            width: activeIndex === i ? 24 : 8,
                            height: 8,
                            backgroundColor: activeIndex === i ? colors.primary : colors.border,
                        }}
                    />
                ))}
            </View>
        </View>
    );
}
