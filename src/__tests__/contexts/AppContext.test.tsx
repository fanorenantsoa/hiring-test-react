import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { AppContextProvider, useAppContext } from "../../contexts/AppContext";

// Mock du fetch
global.fetch = vi.fn();

describe("AppContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    document.documentElement.removeAttribute("data-theme");
    // Mock fetch par défaut pour tous les tests
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => [],
    } as Response);
  });

  it("devrait initialiser avec le thème light par défaut", () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });
    expect(result.current.theme).toBe("light");
  });

  it("devrait basculer le thème entre light et dark", () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("devrait charger les features depuis l'API", async () => {
    const mockFeatures = [
      { id: 1, name: "Test 1", description: "Description 1" },
    ];

    // Réinitialiser le mock pour ce test spécifique
    vi.mocked(fetch).mockReset();
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockFeatures,
    } as Response);

    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.features).toEqual(mockFeatures);
    expect(result.current.selectedFeature).toEqual(mockFeatures[0]);
  });

  it("devrait sélectionner une feature", () => {
    const mockFeature = { id: 1, name: "Test", description: "Desc" };

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => [mockFeature],
    } as Response);

    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    act(() => {
      result.current.setSelectedFeature(mockFeature);
    });

    expect(result.current.selectedFeature).toEqual(mockFeature);
  });

  it("devrait appliquer le thème au document", async () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    await act(async () => {
      result.current.toggleTheme();
      // Attendre que le useEffect s'exécute
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("devrait gérer les erreurs lors du chargement des features", async () => {
    // Réinitialiser le mock pour ce test spécifique
    vi.mocked(fetch).mockReset();
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.features).toEqual([]);
  });
});
