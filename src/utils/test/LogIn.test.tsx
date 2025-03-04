import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach, Mock } from "vitest";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LogInForm/LoginForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loginUserAsync,
} from "../../store/slices/userSlice";


vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../store/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("../../store/slices/userSlice", () => ({
  loginUserAsync: vi.fn(),
  getUserByIdAsync: vi.fn(),
  getFilteredFilmesAsync: vi.fn(),
  getAllMetadataAsync: vi.fn(),
}));

describe("LoginForm", () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (vi.mocked(useAppDispatch) as any).mockReturnValue(mockDispatch);
    (vi.mocked(useNavigate) as any).mockReturnValue(mockNavigate);
    (vi.mocked(useAppSelector) as any).mockImplementation((selector: any) =>
      selector({ user: { token: "fake-token" } })
    );
  });

  it("renders the login form correctly", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  it("handles error on failed login", async () => {
    (vi.mocked(loginUserAsync) as any).mockRejectedValueOnce(
      new Error("Login failed")
    );
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );
  });

  it("navigates to the register page when 'Sign Up' is clicked", () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByText("Sign Up"));
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
});
