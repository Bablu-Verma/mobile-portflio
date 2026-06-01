import { Button } from '@/components/Button';
import { CTASection } from '@/components/CTASection';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { ThemedSafeArea, ThemedScrollView } from '@/components/ThemedWrappers';
import { WorkflowSection } from '@/components/WorkflowSection';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';

import { EducationCard } from '@/components/EducationCard';
import { SectionTitle } from '@/components/SectionTitle';
import { SkillBadge } from '@/components/SkillBadge';
import { useAbout, useEducation, useSkills } from '@/lib/api';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { data: about, isLoading: aboutLoading } = useAbout();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: educationRes, isLoading: eduLoading } = useEducation();
  const [showAll, setShowAll] = useState(false);

  const education = educationRes?.items ?? [];

  return (
    <ThemedSafeArea><ThemedScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <HeroSection />

      <View className="px-5 pb-10">

        {/* ================= ABOUT PARAGRAPHS ================= */}
        {!aboutLoading && about?.bio && about.bio.length > 0 && (
          <View className="mt-4 mb-10">

            <SectionTitle
              title="About Me"
              subtitle=""
            />

            {about.bio.map((paragraph, i) => (
              <Text
                key={i}
                className="text-base leading-6 mb-3"
                style={{ color: colors.mutedForeground }}
              >
                {paragraph}
              </Text>
            ))}

            <View className="items-center mt-4">
              <Image
                source={{ uri: about.image }}
                className="w-full h-72 rounded-2xl"
                resizeMode="cover"
              />
            </View>
          </View>
        )}

        {/* ================= TECH STACK ================= */}
        <SectionTitle
          title="Tech Stack"
          subtitle="Technologies I work with daily"
        />

        {skillsLoading ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <View className="gap-6 mt-2">
            {skills?.map((group) => (
              <View key={group.title}>
                <View className="flex-row flex-wrap items-center gap-2 mb-3">
                  <View className="rounded-full px-3 py-1"

                  >
                    <Text style={{ color: colors.foreground }} className="text-base font-semibold" >
                      {group.title}
                    </Text>
                  </View>
                </View>
                <View className="flex-row flex-wrap">
                  {group.items.map((item, i) => (
                    <SkillBadge key={i} label={item} />
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Soft Divider */}
        <View className="h-px my-10 opacity-40"
          style={{ backgroundColor: colors.border }}
        />

        {/* ================= EDUCATION ================= */}
        <SectionTitle
          title="Education"
          subtitle="Academic background & continuous learning"
        />

        {!eduLoading && educationRes?.intro && educationRes.intro.length > 0 && (
          <View className="mt-3 mb-5">
            {educationRes.intro.map((paragraph, i) => (
              <Text
                key={i}
                className="text-sm leading-5 mb-2"
                style={{ color: colors.mutedForeground }}
              >
                {paragraph}
              </Text>
            ))}
          </View>
        )}

        <View className="mt-2 space-y-4">
          {eduLoading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <>
              {(showAll ? education : education.slice(0, 3)).map((edu) => (
                <Pressable key={edu.id} onPress={() => router.push(`/education/${edu.id}`)}>
                  <EducationCard education={edu} />
                </Pressable>
              ))}
              {education.length > 3 && !showAll && (
                <Button
                  variant="ghost"
                  size="sm"
                  onPress={() => setShowAll(true)}
                  fullWidth
                  className="py-3"
                >
                  View All ({education.length - 3} more)
                </Button>
              )}
            </>
          )}
        </View>

      </View>

      <ServicesSection />
      <TestimonialCarousel />
      <WorkflowSection />
      <CTASection />

    </ThemedScrollView></ThemedSafeArea>
  );
}
