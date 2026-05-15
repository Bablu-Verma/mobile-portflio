import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
    const { colors } = useTheme();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.mutedForeground,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'About',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="projects"
                options={{
                    title: 'Projects',
                    tabBarIcon: ({ color, size }) => <Ionicons name="folder-open" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="experience"
                options={{
                    title: 'Experience',
                    tabBarIcon: ({ color, size }) => <Ionicons name="briefcase" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    title: 'Menu',
                    tabBarIcon: ({ color, size }) => <Ionicons name="menu" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}