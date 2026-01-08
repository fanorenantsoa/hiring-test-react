import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Feature } from "../types/Feature";
import { useFeatures } from "../hooks/useFeatures";

type Theme = "light" | "dark";

interface AppContextType {
  features: Feature[];
  selectedFeature: Feature | null;
  setSelectedFeature: (feature: Feature) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { features, loading } = useFeatures();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initialTheme = (saved as Theme) || "light";
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    if (features.length > 0 && !selectedFeature) {
      setSelectedFeature(features[0]);
    }
  }, [features, selectedFeature]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <AppContext.Provider
      value={{
        features,
        selectedFeature,
        setSelectedFeature,
        theme,
        toggleTheme,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
