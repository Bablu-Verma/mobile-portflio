import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { useColorScheme } from "nativewind";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    border: string;
    input: string;
    ring: string;
    card: string;
    cardForeground: string;
  };
}

const lightColors = {
  background: "#f4f4f5",
  foreground: "#0d0d0f",
  primary: "#E85D04",
  primaryForeground: "#ffffff",
  secondary: "#e4e4e7",
  secondaryForeground: "#0d0d0f",
  muted: "#d4d4d8",
  mutedForeground: "#71717a",
  accent: "#ff7a1a",
  accentForeground: "#ffffff",
  destructive: "#ef4444",
  border: "#d4d4d8",
  input: "#d4d4d8",
  ring: "#E85D04",
  card: "#ffffff",
  cardForeground: "#0d0d0f",
};

const darkColors = {
  background: "#0d0d0f",
  foreground: "#f4f4f5",
  primary: "#E85D04",
  primaryForeground: "#ffffff",
  secondary: "#1c1c22",
  secondaryForeground: "#f4f4f5",
  muted: "#26262e",
  mutedForeground: "#a1a1aa",
  accent: "#ff7a1a",
  accentForeground: "#ffffff",
  destructive: "#ef4444",
  border: "#2a2a33",
  input: "#2a2a33",
  ring: "#E85D04",
  card: "#1a1a20",
  cardForeground: "#f4f4f5",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [theme, setTheme] = useState<ThemeMode>(() =>
    colorScheme === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    if (colorScheme) {
      setTheme(colorScheme === "dark" ? "dark" : "light");
    }
  }, [colorScheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      setColorScheme(next);
      return next;
    });
  }, [setColorScheme]);

  const colors = useMemo(
    () => (theme === "dark" ? darkColors : lightColors),
    [theme],
  );

  const value = useMemo(
    () => ({ theme, toggleTheme, colors }),
    [theme, toggleTheme, colors],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
