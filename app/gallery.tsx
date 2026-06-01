import { ThemedSafeArea, ThemedScrollView } from '@/components/ThemedWrappers';
import { Button } from '@/components/Button';
import { GalleryCard } from '@/components/GalleryCard';
import { SectionTitle } from '@/components/SectionTitle';
import { useTheme } from '@/context/ThemeContext';
import { useGalleryImages } from '@/lib/api';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Modal, Pressable, Text, useWindowDimensions, View } from 'react-native';

export default function GalleryScreen() {
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const { data: galleryImages = [], isLoading } = useGalleryImages();
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const numColumns = width > 600 ? 3 : 2;
    const spacing = 12;
    const cardWidth = (width - spacing * (numColumns + 1)) / numColumns - 20;

    return (
        <ThemedSafeArea><ThemedScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <SectionTitle title="Project Gallery" subtitle="Showcase of our completed projects and solutions" />

            {isLoading ? (
                <View className="items-center justify-center" style={{ height: 300 }}>
                    <View className="h-12 w-12 rounded-full animate-spin" style={{ backgroundColor: colors.primary, opacity: 0.3 }} />
                    <Text className="mt-4 text-base" style={{ color: colors.mutedForeground }}>Loading gallery...</Text>
                </View>
            ) : galleryImages.length === 0 ? (
                <View className="items-center justify-center px-8" style={{ height: 300 }}>
                    <Text className="text-4xl mb-3">📷</Text>
                    <Text className="text-base font-semibold text-center" style={{ color: colors.foreground }}>No images yet</Text>
                    <Text className="text-base text-center mt-1" style={{ color: colors.mutedForeground }}>Gallery photos will appear here once uploaded</Text>
                </View>
            ) : (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: spacing, paddingTop: 8 }}>
                    {galleryImages.map((item, i) => (
                        <Pressable
                            key={i}
                            onPress={() => setSelectedImage(i)}
                            style={{ width: cardWidth, marginLeft: (i % numColumns) === 0 ? spacing : spacing / 2, marginRight: (i % numColumns) === numColumns - 1 ? spacing : spacing / 2, marginBottom: spacing }}
                        >
                            <GalleryCard item={item} cardWidth={cardWidth} />
                        </Pressable>
                    ))}
                </View>
            )}

            <Modal visible={selectedImage !== null} transparent animationType="fade" onRequestClose={() => setSelectedImage(null)}>
                <View className="flex-1 items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}>
                    <StatusBar style="light" />
                    {selectedImage !== null && galleryImages[selectedImage] && (
                        <View className="w-full px-4">
                            <Image
                                source={{ uri: galleryImages[selectedImage].src }}
                                style={{ width: '100%', height: width * 0.7, borderRadius: 12 }}
                                resizeMode="contain"
                            />
                            <Text className="text-center text-white mt-4 text-base font-medium">
                                {galleryImages[selectedImage].alt}
                            </Text>
                        </View>
                    )}
                    <Button variant="ghost" size="sm" rounded="full" onPress={() => setSelectedImage(null)} style={{ position: 'absolute', top: 48, right: 24, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        <Text className="text-white text-base font-bold px-1">✕</Text>
                    </Button>
                    {selectedImage !== null && selectedImage > 0 && (
                        <Button variant="ghost" size="sm" rounded="full" onPress={() => setSelectedImage(selectedImage - 1)} style={{ position: 'absolute', left: 16, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                            <Text className="text-white text-xl px-1">‹</Text>
                        </Button>
                    )}
                    {selectedImage !== null && selectedImage < galleryImages.length - 1 && (
                        <Button variant="ghost" size="sm" rounded="full" onPress={() => setSelectedImage(selectedImage + 1)} style={{ position: 'absolute', right: 16, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                            <Text className="text-white text-xl px-1">›</Text>
                        </Button>
                    )}
                </View>
            </Modal>
        </ThemedScrollView></ThemedSafeArea>
    );
}
