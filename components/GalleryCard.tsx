import { useTheme } from "@/context/ThemeContext";
import { Image, Text, View } from "react-native";

type Props = {
    item: {
        src: string;
        alt: string;
    };
    cardWidth: number;
};

export const GalleryCard = ({ item, cardWidth }: Props) => {
    const { colors } = useTheme();

    return (
        <View
            className="rounded-2xl overflow-hidden"
            style={{
                width: cardWidth,
                borderColor: colors.border,
                borderWidth: 1,
                backgroundColor: colors.card,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            <Image
                source={{ uri: item.src }}
                style={{ width: "100%", height: cardWidth * 0.85 }}
                resizeMode="cover"
            />

            <View className="px-3 py-2">
                <Text
                    className="text-xs font-medium truncate"
                    style={{ color: colors.foreground }}
                >
                    {item.alt}
                </Text>
            </View>
        </View>
    );
};
