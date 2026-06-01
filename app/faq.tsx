import { ThemedSafeArea, ThemedScrollView } from '@/components/ThemedWrappers';
import { SectionTitle } from '@/components/SectionTitle';
import { useTheme } from '@/context/ThemeContext';
import { useFaqs } from '@/lib/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

function FAQItem({ faq, isOpen, onToggle }: { faq: any; isOpen: boolean; onToggle: () => void }) {
    const { colors } = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
            <Pressable
                onPress={onToggle}
                onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.99, useNativeDriver: true, friction: 8, tension: 120 }).start()}
                onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5, tension: 40 }).start()}
                className="mb-3 rounded-2xl border overflow-hidden"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
                <View className="flex-row items-center justify-between p-4">
                    <Text className="text-base font-semibold flex-1 pr-2" style={{ color: colors.foreground }}>
                        {faq.question}
                    </Text>
                    <View className="h-8 w-8 rounded-full items-center justify-center" style={{ backgroundColor: isOpen ? colors.primary + '20' : 'transparent' }}>
                        {isOpen ? (
                            <Ionicons name="chevron-up" size={18} color={colors.primary} />
                        ) : (
                            <Ionicons name="chevron-down" size={18} color={colors.mutedForeground} />
                        )}
                    </View>
                </View>
                {isOpen && (
                    <View className="px-4 pb-4 border-t" style={{ borderTopColor: colors.border }}>
                        <Text className="text-base leading-6 pt-3" style={{ color: colors.mutedForeground }}>
                            {faq.answer}
                        </Text>
                    </View>
                )}
            </Pressable>
        </Animated.View>
    );
}

export default function FAQScreen() {
    const [openId, setOpenId] = useState<string | null>(null);
    const { colors } = useTheme();
    const { data: faqs = [], isLoading } = useFaqs();

    if (isLoading) {
        return (
            <ThemedSafeArea>
                <View className="flex-1 items-center justify-center px-8">
                    <View className="h-12 w-12 rounded-full animate-spin" style={{ backgroundColor: colors.primary, opacity: 0.3 }} />
                    <Text className="mt-4 text-base" style={{ color: colors.mutedForeground }}>Loading FAQs...</Text>
                </View>
            </ThemedSafeArea>
        );
    }

    return (
        <ThemedSafeArea><ThemedScrollView contentContainerStyle={{ paddingVertical: 40, paddingHorizontal: 20 }}>
            <SectionTitle title="FAQ" subtitle="Common questions answered" />

            {faqs.length === 0 ? (
                <View className="items-center justify-center py-20 px-8">
                    <Text className="text-4xl mb-3">❓</Text>
                    <Text className="text-base font-semibold text-center" style={{ color: colors.foreground }}>No FAQs yet</Text>
                    <Text className="text-base text-center mt-1" style={{ color: colors.mutedForeground }}>Frequently asked questions will appear here</Text>
                </View>
            ) : (
                faqs.map((faq) => (
                    <FAQItem
                        key={faq.id}
                        faq={faq}
                        isOpen={openId === faq.id}
                        onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                    />
                ))
            )}
        </ThemedScrollView></ThemedSafeArea>
    );
}
