import { render, screen, fireEvent } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { useNavigate } from "react-router-dom";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import { routes } from "../../routes/routes";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

describe("ReturnButton", () => {
  it("renders the return button correctly", () => {
    render(<ReturnButton prevPage={1} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("calls navigate with correct parameters when clicked", () => {
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    render(<ReturnButton prevPage={3} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(routes.HOME, {
      state: { page: 3 },
    });
  });
});
