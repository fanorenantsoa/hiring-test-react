import { useEffect, useState } from "react";
import type { Feature } from "../types/Feature";

interface UseFeaturesReturn {
  features: Feature[];
  loading: boolean;
  error: Error | null;
}

export const useFeatures = (): UseFeaturesReturn => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/data.json");

        if (!response.ok) {
          throw new Error(`Failed to fetch features: ${response.statusText}`);
        }

        const data = await response.json();
        setFeatures(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        console.error("Error loading data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  return { features, loading, error };
};
