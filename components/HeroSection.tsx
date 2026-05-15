import { personalInfo, stats } from '@/constants/data';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Linking,
    Pressable,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';

const phrases = [
    'I build fast & scalable apps',
    'I create seamless user experiences',
    'I turn ideas into real products',
];

function useTypewriter(words: string[]) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && text.length < currentWord.length) {
            timeout = setTimeout(
                () => setText(currentWord.slice(0, text.length + 1)),
                50
            );
        } else if (!isDeleting && text.length === currentWord.length) {
            timeout = setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && text.length > 0) {
            timeout = setTimeout(
                () => setText(currentWord.slice(0, text.length - 1)),
                30
            );
        } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words]);

    return text;
}

export function HeroSection() {
    const typedText = useTypewriter(phrases);
    const { colors } = useTheme();
    const { height } = useWindowDimensions(); // ✅ Screen height

    const openUrl = (url: string) =>
        Linking.openURL(url).catch(() => { });

    return (
        <View
            className="px-5 pt-16 pb-5 justify-center"
            style={{ minHeight: height * 0.8 }} // ✅ FIXED HEIGHT
        >
            {/* Background Gradient */}
            <LinearGradient
                colors={[colors.background, colors.secondary, colors.background]}
                className="absolute inset-0"
            />

            {/* Glow Effect */}
            <View
                className="absolute self-center rounded-full -top-12 w-[300] h-[300]"
                style={{
                    backgroundColor: colors.primary,
                    opacity: 0.08,
                }}
            />

            <View className="items-center justify-evenly relative">
                {/* Tagline Badge */}
                <View
                    className="flex-row items-center rounded-full border px-4 py-2 mb-6"
                    style={{
                        borderColor: colors.border,
                        backgroundColor: colors.card,
                    }}
                >
                    <Ionicons name="sparkles" size={14} color={colors.primary} />
                    <Text
                        className="ml-2 text-xs font-medium"
                        style={{ color: colors.foreground }}
                    >
                        Scalable systems. Clean UI. Real products.
                    </Text>
                </View>

                {/* Intro */}
                <Text
                    className="text-2xl mb-1"
                    style={{ color: colors.mutedForeground }}
                >
                    Hi, I&apos;m
                </Text>

                <Text
                    className="text-5xl font-bold mb-2 text-center"
                    style={{ color: colors.foreground }}
                >
                    {personalInfo.name}
                </Text>

                {/* Heading */}
                <Text
                    className="text-center text-4xl font-bold leading-10 mb-3"
                    style={{ color: colors.foreground }}
                >
                    I build{' '}
                    <Text style={{ color: colors.primary }}>
                        high-performance
                    </Text>
                    {'\n'}web & mobile apps
                </Text>

                {/* Bio */}
                <Text
                    className="text-center text-base leading-5 mb-4 px-4"
                    style={{ color: colors.mutedForeground }}
                >
                    {personalInfo.bio}
                </Text>

                {/* Typewriter */}
                <View className="h-8 justify-center mb-6">
                    <Text
                        className="text-lg font-semibold"
                        style={{ color: colors.accent }}
                    >
                        {typedText}
                        <Text style={{ color: colors.primary }}>|</Text>
                    </Text>
                </View>

                {/* Social Icons */}
                <View className="flex-row items-center mb-8">
                    <Pressable
                        onPress={() => openUrl(personalInfo.github)}
                        className="mx-2 rounded-full border p-3"
                        style={{
                            borderColor: colors.border,
                            backgroundColor: colors.card,
                        }}
                    >
                        <Ionicons
                            name="logo-github"
                            size={18}
                            color={colors.foreground}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => openUrl(personalInfo.linkedin)}
                        className="mx-2 rounded-full border p-3"
                        style={{
                            borderColor: colors.border,
                            backgroundColor: colors.card,
                        }}
                    >
                        <Ionicons
                            name="logo-linkedin"
                            size={18}
                            color={colors.foreground}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => openUrl(personalInfo.site)}
                        className="mx-2 rounded-full border p-3"
                        style={{
                            borderColor: colors.border,
                            backgroundColor: colors.card,
                        }}
                    >
                        <Ionicons
                            name="link"
                            size={18}
                            color={colors.foreground}
                        />
                    </Pressable>
                </View>

                {/* CTA Buttons */}
                <View className="flex-row w-full max-w-[280px] justify-between mb-4">
                    <Pressable
                        onPress={() => openUrl(personalInfo.resumeUrl)}
                        className="flex-row items-center justify-center rounded-xl px-4 py-3 flex-1 mr-2"
                        style={{ backgroundColor: colors.primary }}
                    >
                        <Ionicons name="download" size={18} color="#fff" />
                        <Text className="ml-2 text-base font-semibold text-white">
                            Resume
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.navigate('/contact')}
                        className="flex-row items-center justify-center rounded-xl px-4 py-3 flex-1 ml-2 border"
                        style={{
                            borderColor: colors.border,
                            backgroundColor: colors.card,
                        }}
                    >
                        <Ionicons
                            name="arrow-forward"
                            size={18}
                            color={colors.primary}
                        />
                        <Text
                            className="ml-2 text-base font-semibold"
                            style={{ color: colors.primary }}
                        >
                            Contact
                        </Text>
                    </Pressable>
                </View>

                {/* Stats */}
                <View className="flex-row flex-wrap justify-center mt-6">
                    {stats.map((stat, i) => (
                        <View key={i} className="items-center mx-4 my-2">
                            <Text
                                className="text-2xl font-bold"
                                style={{ color: colors.primary }}
                            >
                                {stat.value}
                            </Text>
                            <Text
                                className="text-sm mt-1"
                                style={{ color: colors.mutedForeground }}
                            >
                                {stat.label}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}