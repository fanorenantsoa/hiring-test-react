import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { AppContextProvider, useAppContext } from "../../contexts/AppContext";

// Mock du fetch
window.fetch = vi.fn();

describe("AppContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    document.documentElement.removeAttribute("data-theme");
    // Mock fetch par défaut pour tous les tests
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      statusText: "OK",
      json: async () => [],
    } as Response);
  });

  it("devrait initialiser avec le thème light par défaut", async () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    // Attendre que le chargement soit terminé
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.theme).toBe("light");
  });

  it("devrait basculer le thème entre light et dark", async () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    // Attendre que le chargement soit terminé
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
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
      ok: true,
      statusText: "OK",
      json: async () => mockFeatures,
    } as Response);

    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.features).toEqual(mockFeatures);
    expect(result.current.selectedFeature).toEqual(mockFeatures[0]);
  });

  it("devrait sélectionner une feature", async () => {
    const mockFeature = { id: 1, name: "Test", description: "Desc" };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      statusText: "OK",
      json: async () => [mockFeature],
    } as Response);

    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    // Attendre que le chargement soit terminé
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
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

    // Attendre que le chargement soit terminé
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.toggleTheme();
    });

    await waitFor(() => {
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });
  });

  it("devrait gérer les erreurs lors du chargement des features", async () => {
    // Réinitialiser le mock pour ce test spécifique
    vi.mocked(fetch).mockReset();
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppContextProvider,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.features).toEqual([]);
  });
});
