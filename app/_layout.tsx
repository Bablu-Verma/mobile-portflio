import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../global.css";

const queryClient = new QueryClient();

const screenOptions = {
  headerShown: false,
};

export default function RootLayout() {


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Stack screenOptions={screenOptions}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="contact" />
          <Stack.Screen name="faq" />
          <Stack.Screen name="gallery" />
          <Stack.Screen name="experience/[id]" />
          <Stack.Screen name="project/[slug]" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
