import { Button } from '@/components/Button';
import { ThemedSafeArea, ThemedScrollView } from '@/components/ThemedWrappers';
import { personalInfo } from "@/constants/data";
import { useTheme } from "@/context/ThemeContext";
import { useAbout } from '@/lib/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";

export default function MenuScreen() {
  const router = useRouter();
  const { theme, toggleTheme, colors } = useTheme();
  const { data: about } = useAbout();
  const [imageError, setImageError] = useState(false);

  const labelStyle = { color: colors.foreground };
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open link');
      }
    } catch {
      Alert.alert('Error', 'Something went wrong');
    }
  };


  const MenuItem = ({ iconName, label, onPress, showArrow = true }: any) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    return (
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
        <Pressable
          onPress={onPress}
          onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.98, useNativeDriver: true, friction: 8, tension: 120 }).start()}
          onPressOut={() => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 5, tension: 40 }).start()}
          style={{ borderBottomColor: colors.border }}
          className="flex-row items-center justify-between py-3.5 px-4 border-b last:border-b-0"
        >
          <View className="flex-row items-center">
            <View
              style={{ backgroundColor: colors.primary + '15' }}
              className="w-[34px] h-[34px] items-center justify-center mr-3 rounded-lg"
            >
              <Ionicons name={iconName} size={18} color={colors.primary} />
            </View>
            <Text style={{ color: colors.foreground }} className="text-[15px] font-medium text-foreground">
              {label}
            </Text>
          </View>
          {showArrow && (
            <Text style={{ color: colors.mutedForeground }}>›</Text>
          )}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <ThemedSafeArea className="flex-1"><ThemedScrollView>

      <View
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
        className="mx-5 mb-5 p-5 mt-10 rounded-2xl border"
      >
        <View className="flex-row items-center gap-3">
          <View
            style={{ backgroundColor: colors.primary }}
            className="w-[70px] h-[70px] rounded-full items-center justify-center mb-3 overflow-hidden"
          >
            {!imageError ? (
              <Image
                source={{ uri: about?.image }}
                className="w-full h-full"
                resizeMode="cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <Text className="text-2xl font-bold text-primary-foreground">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </Text>
            )}
          </View>
          <View>
            <Text style={{ color: colors.foreground }} className="text-base font-bold mb-1 text-foreground">
              {personalInfo.name}
            </Text>
            <Text className="text-base font-semibold mb-2 text-primary">
              {personalInfo.role}
            </Text>
          </View>
        </View>
        <Text className="text-[13px] leading-[18px] mb-4 text-muted-foreground">
          {personalInfo.bio}
        </Text>

      </View>

      {/* Menu Items */}
      <View
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
        className="mx-5 mb-5 rounded-2xl border overflow-hidden"
      >
        <MenuItem
          iconName="person"
          label="About Me"
          onPress={() => router.push("/(tabs)")}
        />
        <MenuItem
          iconName="folder-open"
          label="Projects"
          onPress={() => router.push("/(tabs)/projects")}
        />
        <MenuItem
          iconName="briefcase"
          label="Experience"
          onPress={() => router.push("/(tabs)/experience")}
        />
        <MenuItem
          iconName="help-circle"
          label="FAQ"
          onPress={() => router.push("/faq")}
        />
        <MenuItem
          iconName="image"
          label="Gallery"
          onPress={() => router.push("/gallery")}
        />
        <MenuItem
          iconName="mail"
          label="Contact"
          onPress={() => router.push("/contact")}
        />

      </View>

      <View className="mb-6 mx-5">
        <Text className="text-base font-semibold mb-4" style={labelStyle}>Connect with me</Text>
        <View className="flex-row gap-3">
          <Button variant="social" size="md" icon="logo-linkedin" onPress={() => openLink(personalInfo.linkedin)} fullWidth>LinkedIn</Button>
          <Button variant="social" size="md" icon="logo-github" onPress={() => openLink(personalInfo.github)} fullWidth>GitHub</Button>
          <Button variant="social" size="md" icon="link" onPress={() => openLink(personalInfo.site)} fullWidth>My Site</Button>
        </View>
      </View>

      {/* Settings */}
      <View
        style={{ backgroundColor: colors.card, borderColor: colors.border }}
        className="mx-5 mb-5 p-4 rounded-2xl border"
      >

        <Pressable
          onPress={toggleTheme}
          className="flex-row items-center justify-between"
          style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
        >
          <View className="flex-row items-center">
            <View
              style={{ backgroundColor: colors.primary + '15' }}
              className="w-[34px] h-[34px] items-center justify-center mr-3 rounded-lg"
            >
              {theme === 'dark' ? (
                <Ionicons name="sunny" size={18} color={colors.primary} />
              ) : (
                <Ionicons name="moon" size={18} color={colors.primary} />
              )}
            </View>
            <Text style={{ color: colors.foreground }} className="text-[15px] font-medium text-foreground">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </View>
          <View
            style={{ backgroundColor: colors.primary }}
            className="px-3 py-1.5 rounded-xl"
          >
            <Text className="text-xs font-semibold text-primary-foreground">
              {theme === 'dark' ? 'On' : 'Off'}
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Footer */}
      <View className="items-center py-5">
        <Text className="text-xs text-muted-foreground">
          v1.0.0 • Built with Love by {personalInfo.name}
        </Text>
      </View>
    </ThemedScrollView></ThemedSafeArea>
  );
}
