import { ThemedSafeArea, ThemedScrollView, ThemedKeyboardView } from '@/components/ThemedWrappers';
import { Button } from '@/components/Button';
import { SectionTitle } from '@/components/SectionTitle';
import { personalInfo } from '@/constants/data';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    Animated,
    Linking,
    Pressable,
    Text,
    TextInput,
    View,
} from 'react-native';

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactScreen() {
    const { colors } = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm<FormData>({ mode: 'onChange' });



    const openLink = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.log(error);

            Alert.alert(
                'Error',
                'Unable to open link'
            );
        }
    };

    const onSubmit = async (data: FormData) => {
        try {
            setIsSubmitting(true);

            const rawPhone =
                process.env.EXPO_PUBLIC_MOBILE_NUMBER || '';

            const phoneNumber =
                rawPhone.replace(/\D/g, '');
            console.log('PHONE:', phoneNumber);

            if (!phoneNumber) {
                Alert.alert(
                    'Error',
                    'Phone number not configured'
                );
                return;
            }


            const message = `Hello Bablu Verma

I'm ${data.name}

Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}`;

            const url =
                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            console.log(url);

            await Linking.openURL(url);

            reset();

        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };



    const inputStyle = {
        borderColor: colors.border,
        color: colors.foreground,
        backgroundColor: colors.background,
    };

    const labelStyle = { color: colors.foreground };
    const errorStyle = { color: colors.destructive };

    const ContactInfoItem = ({ icon, label, value }: { icon: string; label: string; value: string }) => {
        const scaleAnim = useRef(new Animated.Value(1)).current;
        return (
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                <Pressable
                    onPress={() => openLink(`mailto:${personalInfo.email}`)}
                    onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, friction: 8, tension: 120 }).start()}
                    onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5, tension: 40 }).start()}
                    className="flex-row items-center mb-4 last:mb-0"
                >
                    <View className="h-10 w-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: colors.primary + '20' }}>
                        <Ionicons name={icon as any} size={18} color={colors.primary} />
                    </View>
                    <View>
                        <Text className="text-xs" style={{ color: colors.mutedForeground }}>{label}</Text>
                        <Text className="text-base font-medium" style={labelStyle}>{value}</Text>
                    </View>
                </Pressable>
            </Animated.View>
        );
    };

    return (
        <ThemedSafeArea><ThemedKeyboardView><ThemedScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
            <SectionTitle title="Get in Touch" subtitle="Let's work together on your next project" />

            <View className="mb-6 gap-4 rounded-2xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                <ContactInfoItem icon="mail" label="Email" value={personalInfo.email} />
                <ContactInfoItem icon="location" label="Location" value={personalInfo.location} />
            </View>

            <View className="mb-6 gap-2 rounded-2xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Text className="text-base font-medium mb-2" style={labelStyle}>Name</Text>
                            <TextInput
                                placeholder="Your name"
                                placeholderTextColor={colors.mutedForeground}
                                value={value}
                                onChangeText={onChange}
                                className="rounded-xl p-3 mb-1 border"
                                style={inputStyle}
                            />
                            {errors.name && <Text className="text-xs mb-2" style={errorStyle}>{errors.name.message}</Text>}
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/i, message: 'Invalid email address' } }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Text className="text-base font-medium mb-2" style={labelStyle}>Email</Text>
                            <TextInput
                                placeholder="your@email.com"
                                placeholderTextColor={colors.mutedForeground}
                                value={value}
                                onChangeText={onChange}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="rounded-xl p-3 mb-1 border"
                                style={inputStyle}
                            />
                            {errors.email && <Text className="text-xs mb-2" style={errorStyle}>{errors.email.message}</Text>}
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="subject"
                    rules={{ required: 'Subject is required' }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Text className="text-base font-medium mb-2" style={labelStyle}>Subject</Text>
                            <TextInput
                                placeholder="Project inquiry"
                                placeholderTextColor={colors.mutedForeground}
                                value={value}
                                onChangeText={onChange}
                                className="rounded-xl p-3 mb-1 border"
                                style={inputStyle}
                            />
                            {errors.subject && <Text className="text-xs mb-2" style={errorStyle}>{errors.subject.message}</Text>}
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="message"
                    rules={{ required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Text className="text-base font-medium mb-2" style={labelStyle}>Message</Text>
                            <TextInput
                                placeholder="Tell me about your project..."
                                placeholderTextColor={colors.mutedForeground}
                                value={value}
                                onChangeText={onChange}
                                multiline
                                numberOfLines={4}
                                className="rounded-xl p-3 mb-1 border"
                                style={[inputStyle, { minHeight: 100, textAlignVertical: 'top' }]}
                            />
                            {errors.message && <Text className="text-xs mb-2" style={errorStyle}>{errors.message.message}</Text>}
                        </>
                    )}
                />

                <Button
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting || !isDirty || !isValid}
                    loading={isSubmitting}
                    variant="primary"
                    size="lg"
                    icon="logo-whatsapp"
                    fullWidth
                    className="mt-4"
                >
                    Send via WhatsApp
                </Button>
            </View>

            <View className="mb-6">
                <Text className="text-base font-semibold mb-4" style={labelStyle}>Connect with me</Text>
                <View className="flex-row gap-3">
                    <Button variant="social" size="sm" icon="logo-linkedin" onPress={() => openLink(personalInfo.linkedin)} fullWidth>LinkedIn</Button>
                    <Button variant="social" size="sm" icon="logo-github" onPress={() => openLink(personalInfo.github)} fullWidth>GitHub</Button>
                    <Button variant="social" size="sm" icon="link" onPress={() => openLink(personalInfo.site)} fullWidth>Site</Button>
                </View>

            </View>
        </ThemedScrollView></ThemedKeyboardView></ThemedSafeArea>
    );
}
