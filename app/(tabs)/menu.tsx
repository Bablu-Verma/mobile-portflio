import { personalInfo } from "@/constants/data";
import { useTheme } from "@/context/ThemeContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen({ visible, onClose }: any) {
  const router = useRouter();
  const { theme, toggleTheme, colors } = useTheme();
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


  const MenuItem = ({ iconName, label, onPress, showArrow = true }: any) => (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { borderBottomColor: colors.border, opacity: pressed ? 0.7 : 1, }
      ]}
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
  );

  const SocialButton = ({ icon, label, url }: { icon: string; label: string; url: string }) => (
    <Pressable
      onPress={() => openLink(url)}
      className="flex-1 flex-row items-center justify-center gap-2 px-4 py-3 rounded-xl border"
      style={({ pressed }) => ({
        borderColor: colors.border,
        backgroundColor: colors.card,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Ionicons name={icon as any} size={18} color={colors.foreground} />
      <Text className="text-base font-medium" style={labelStyle}>{label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className="flex-1"
    >
      <ScrollView showsVerticalScrollIndicator={false}>

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
                  source={require('@/assets/images/bablu.jpg')} // 👈 add image URL in your data
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
            <SocialButton icon="logo-linkedin" label="LinkedIn" url={personalInfo.linkedin} />
            <SocialButton icon="logo-github" label="GitHub" url={personalInfo.github} />
            <SocialButton icon="link" label="Site" url={personalInfo.site} />
          </View>
          {/* <View className="flex-row gap-3 mt-3">
                               <SocialButton icon="logo-twitter" label="Twitter" url={personalInfo.twitter} />
                               <SocialButton icon="logo-instagram" label="Instagram" url={personalInfo.instagram} />
                           </View> */}
        </View>

        {/* Settings */}
        <View
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
          className="mx-5 mb-5 p-4 rounded-2xl border"
        >

          <Pressable
            onPress={toggleTheme}
            className="flex-row items-center justify-between"
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
      </ScrollView>
    </SafeAreaView>
  );
}
