import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { vi } from "vitest";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import {
  loginUserAsync,
  signUpAsync,
  getUserByIdAsync,
  getFilteredFilmesAsync,
  getAllMetadataAsync,
} from "../../store/slices/userSlice";


vi.mock("../../store/slices/userSlice", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("../../store/slices/userSlice")
  >();
  return {
    ...actual,
    signUpAsync: vi.fn(),
    loginUserAsync: vi.fn(),
    getUserByIdAsync: vi.fn(),
    getFilteredFilmesAsync: vi.fn(),
    getAllMetadataAsync: vi.fn(),
  };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

vi.mock("@mui/material", () => ({
  CircularProgress: () => (
    <div data-testid="mock-circular-progress">Loading</div>
  ),
}));

const renderForm = () => {
  return render(
    <Provider store={store}>
      <Router>
        <SignUpForm />
      </Router>
    </Provider>
  );
};

const fillAndSubmitForm = async () => {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "test@example.com" },
  });

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "John Doe" },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
};

describe("SignUpForm Component", () => {
  const mockNavigate = vi.fn();
  const mockedSignUp = vi.mocked(signUpAsync);
  const mockedLogin = vi.mocked(loginUserAsync);
  const mockedGetUserById = vi.mocked(getUserByIdAsync);
  const mockedGetFilteredFilms = vi.mocked(getFilteredFilmesAsync);
  const mockedGetMetadata = vi.mocked(getAllMetadataAsync);

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    mockedSignUp.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(true),
    } as any);
    mockedLogin.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(true),
    } as any);
    mockedGetUserById.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(true),
    } as any);
    mockedGetFilteredFilms.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(true),
    } as any);
    mockedGetMetadata.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(true),
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all form elements", () => {
      renderForm();

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign up/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    });
  });

  describe("Form Interaction", () => {
    it("should update input fields on change", () => {
      renderForm();

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        /password/i
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      expect(emailInput.value).toBe("test@example.com");
      expect(nameInput.value).toBe("John Doe");
      expect(passwordInput.value).toBe("password123");
    });
  });

  describe("Successful Form Submission", () => {
    it("should call signUpAsync with correct data", async () => {
      renderForm();
      await fillAndSubmitForm();

      await waitFor(() => {
        expect(mockedSignUp).toHaveBeenCalledWith({
          _id: "test@example.com",
          name: "John Doe",
          password: "password123",
          expiration: 1735689600000,
          blocked: false,
          role: "USER",
        });
      });
    });
  });

  describe("Navigation", () => {
    it("should navigate to login page", () => {
      renderForm();

      fireEvent.click(screen.getByText(/sign in/i));

      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
