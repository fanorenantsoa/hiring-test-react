import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MainHeader } from "../../../components/header/MainHeader";
import { AppContextProvider } from "../../../contexts/AppContext";

global.fetch = vi.fn();

describe("MainHeader", () => {
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => [],
    } as Response);
    document.documentElement.removeAttribute("data-theme");
  });

  it("devrait afficher le titre Feature List", () => {
    render(
      <AppContextProvider>
        <MainHeader />
      </AppContextProvider>,
    );
    expect(screen.getByText("Feature List")).toBeInTheDocument();
  });

  it("devrait afficher la checkbox Enable Dark Mode", () => {
    render(
      <AppContextProvider>
        <MainHeader />
      </AppContextProvider>,
    );
    expect(screen.getByLabelText("Enable Dark Mode")).toBeInTheDocument();
  });

  it("devrait basculer le thème quand on clique sur la checkbox", async () => {
    const user = userEvent.setup();

    render(
      <AppContextProvider>
        <MainHeader />
      </AppContextProvider>,
    );

    const checkbox = screen.getByLabelText("Enable Dark Mode");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("devrait afficher la checkbox cochée si le thème est dark", () => {
    localStorage.setItem("theme", "dark");

    render(
      <AppContextProvider>
        <MainHeader />
      </AppContextProvider>,
    );

    const checkbox = screen.getByLabelText("Enable Dark Mode");
    expect(checkbox).toBeChecked();
  });
});
