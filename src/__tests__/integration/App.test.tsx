import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

global.fetch = vi.fn();

describe("App Integration", () => {
  const mockFeatures = [
    { id: 1, name: "Sample Data 1", description: "Description 1" },
    { id: 2, name: "Sample Data 2", description: "Description 2" },
    { id: 3, name: "Sample Data 3", description: "Description 3" },
  ];

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    vi.clearAllMocks();
  });

  it("devrait permettre de sélectionner une feature et afficher sa description", async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockFeatures,
    } as Response);

    render(<App />);

    // Attendre le chargement
    await screen.findByText("Sample Data 1");

    // Cliquer sur Sample Data 2
    const item2 = screen.getByText("Sample Data 2");
    await user.click(item2);

    // Vérifier que la description s'affiche
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  it("devrait basculer le thème et mettre à jour l'interface", async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockFeatures,
    } as Response);

    render(<App />);

    const checkbox = await screen.findByLabelText("Enable Dark Mode");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("devrait afficher le header, le menu et le contenu", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => mockFeatures,
    } as Response);

    render(<App />);

    // Vérifier le header
    expect(screen.getByText("Feature List")).toBeInTheDocument();

    // Vérifier le menu
    await screen.findByText("Sample Data 1");
    expect(screen.getByText("Sample Data 2")).toBeInTheDocument();

    // Vérifier le contenu (première description par défaut)
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  it("devrait persister le thème dans localStorage", async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValue({
      json: async () => mockFeatures,
    } as Response);

    const { unmount } = render(<App />);

    const checkbox = await screen.findByLabelText("Enable Dark Mode");
    await user.click(checkbox);

    expect(localStorage.getItem("theme")).toBe("dark");

    // Re-render pour vérifier que le thème est restauré
    unmount();

    render(<App />);
    const newCheckbox = await screen.findByLabelText("Enable Dark Mode");
    expect(newCheckbox).toBeChecked();
  });
});
