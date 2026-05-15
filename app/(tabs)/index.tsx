import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { WorkflowSection } from '@/components/WorkflowSection';
import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EducationCard } from '@/components/EducationCard';
import { SectionTitle } from '@/components/SectionTitle';
import { SkillBadge } from '@/components/SkillBadge';
import { useAbout, useEducation } from '@/lib/api';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { data: about, isLoading: aboutLoading } = useAbout();
  const { data: education = [], isLoading: eduLoading } = useEducation();
  const [showAll, setShowAll] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <HeroSection />

        <View className="px-5 pb-10">

          {/* ================= TECH STACK ================= */}
          <SectionTitle
            title="Tech Stack"
            subtitle="Technologies I work with daily"
          />

          {aboutLoading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            about?.skillGroups.map((group) => (
              <View key={group.title} className="mt-6">
                <Text className="text-sm font-semibold text-muted-foreground mb-3">
                  {group.title}
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <SkillBadge key={i} label={item} />
                  ))}
                </View>
              </View>
            ))
          )}

          {/* Soft Divider */}
          <View className="h-px bg-border my-10 opacity-40" />

          {/* ================= EDUCATION ================= */}
          <SectionTitle
            title="Education"
            subtitle="Academic background & continuous learning"
          />

          <View className="mt-5 space-y-4">
            {eduLoading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <>
                {(showAll ? education : education.slice(0, 3)).map((edu) => (
                  <EducationCard key={edu.id} education={edu} />
                ))}
                {education.length > 3 && !showAll && (
                  <Pressable
                    onPress={() => setShowAll(true)}
                    className="items-center py-3"
                  >
                    <Text style={{ color: colors.primary }} className="font-semibold">
                      View All ({education.length - 3} more)
                    </Text>
                  </Pressable>
                )}
              </>
            )}
          </View>

        </View>


        <ServicesSection />
        <TestimonialCarousel />
        <WorkflowSection />



      </ScrollView>
    </SafeAreaView>
  );
}
