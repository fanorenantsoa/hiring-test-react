import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuItem } from "../../../components/menuItem/MenuItem";
import type { Feature } from "../../../types/Feature";

describe("MenuItem", () => {
  const mockFeature: Feature = {
    id: 1,
    name: "Sample Data 1",
    description: "Description 1",
  };

  it("devrait afficher le nom de la feature", () => {
    render(
      <MenuItem feature={mockFeature} isSelected={false} onClick={() => {}} />,
    );
    expect(screen.getByText("Sample Data 1")).toBeInTheDocument();
  });

  it("devrait avoir la classe selected quand isSelected est true", () => {
    render(
      <MenuItem feature={mockFeature} isSelected={true} onClick={() => {}} />,
    );
    const button = screen.getByRole("button");
    // Vérifier que la classe contient "menuItem__selected" (CSS modules hash les classes)
    expect(button.className).toContain("menuItem__selected");
  });

  it("devrait ne pas avoir la classe selected quand isSelected est false", () => {
    render(
      <MenuItem feature={mockFeature} isSelected={false} onClick={() => {}} />,
    );
    const button = screen.getByRole("button");
    // Vérifier que la classe ne contient pas "menuItem__selected"
    expect(button.className).not.toContain("menuItem__selected");
  });

  it("devrait appeler onClick au clic", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <MenuItem
        feature={mockFeature}
        isSelected={false}
        onClick={handleClick}
      />,
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("devrait être un élément de liste (li)", () => {
    const { container } = render(
      <MenuItem feature={mockFeature} isSelected={false} onClick={() => {}} />,
    );

    const listItem = container.querySelector("li");
    expect(listItem).toBeInTheDocument();
  });
});
