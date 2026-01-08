import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu } from "../../../components/menu/Menu";
import { AppContextProvider } from "../../../contexts/AppContext";

window.fetch = vi.fn();

describe("Menu", () => {
  const mockFeatures = [
    { id: 1, name: "Sample Data 1", description: "Description 1" },
    { id: 2, name: "Sample Data 2", description: "Description 2" },
    { id: 3, name: "Sample Data 3", description: "Description 3" },
  ];

  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      statusText: "OK",
      json: async () => mockFeatures,
    } as Response);
  });

  it("devrait afficher la liste des features", async () => {
    render(
      <AppContextProvider>
        <Menu />
      </AppContextProvider>,
    );

    await screen.findByText("Sample Data 1");
    expect(screen.getByText("Sample Data 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Data 2")).toBeInTheDocument();
    expect(screen.getByText("Sample Data 3")).toBeInTheDocument();
  });

  it("devrait sélectionner une feature au clic", async () => {
    const user = userEvent.setup();

    render(
      <AppContextProvider>
        <Menu />
      </AppContextProvider>,
    );

    const item2 = await screen.findByText("Sample Data 2");
    await user.click(item2);

    // Vérifier que l'item est sélectionné (classe CSS appliquée)
    expect(item2.className).toContain("menuItem__selected");
  });

  it("devrait désélectionner l'ancien item quand un nouveau est sélectionné", async () => {
    const user = userEvent.setup();

    render(
      <AppContextProvider>
        <Menu />
      </AppContextProvider>,
    );

    const item1 = await screen.findByText("Sample Data 1");
    const item2 = await screen.findByText("Sample Data 2");

    // Cliquer sur le premier item
    await user.click(item1);
    expect(item1.className).toContain("menuItem__selected");

    // Cliquer sur le deuxième item
    await user.click(item2);
    expect(item2.className).toContain("menuItem__selected");
    expect(item1.className).not.toContain("menuItem__selected");
  });

  it("devrait utiliser une structure de liste sémantique", async () => {
    render(
      <AppContextProvider>
        <Menu />
      </AppContextProvider>,
    );

    await screen.findByText("Sample Data 1");

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(mockFeatures.length);
  });
});
