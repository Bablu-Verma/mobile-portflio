import { Button } from '@/components/Button';
import { useTheme } from '@/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export function CTASection() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View
      className=" p-8 pt-0 items-center"

    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center mb-5"
        style={{ backgroundColor: colors.primary + '20' }}
      >
        <Ionicons name="rocket" size={22} color={colors.primary} />
      </View>

      <Text
        className="text-2xl font-bold text-center mb-3"
        style={{ color: colors.foreground }}
      >
        Ready to Bring Your Ideas to Life?
      </Text>

      <Text
        className="text-base text-center leading-6 mb-8"
        style={{ color: colors.mutedForeground }}
      >
        Let&apos;s collaborate and create something extraordinary together. I&apos;m always excited to work on challenging projects.
      </Text>

      <View className="flex-row w-full max-w-[320px] gap-3">
        <Button
          onPress={() => router.navigate('/contact')}
          variant="primary"
          size="md"
          icon="rocket"
          fullWidth
        >
          Start a Project
        </Button>

        <Button
          onPress={() => router.navigate('/contact')}
          variant="outline"
          size="md"
          fullWidth
        >
          Hire Me
        </Button>
      </View>
    </View>
  );
}
