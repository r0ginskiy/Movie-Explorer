import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import FilmCard from "../../components/FilmCard/FilmCard";
import { routes } from "../../routes/routes";
import { Movie } from "../../utils/types";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("FilmCard component", () => {
  const mockMovie: Movie = {
    _id: "123",
    title: "Inception",
    poster: "https://example.com/poster.jpg",
    year: 2010,
    imdb: { rating: 8.8 },
    genres: ["Action", "Sci-Fi"],
    runtime: 148,
    rated: "PG-13",
    countries: ["USA", "UK"],
    tomatoes: {},
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("displays movie details correctly", () => {
    render(
      <MemoryRouter>
        <FilmCard movie={mockMovie} currentPage={1} />
      </MemoryRouter>
    );

    screen.debug();

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Year:")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("Genres:")).toBeInTheDocument();
    expect(screen.getByText("Action, Sci-Fi")).toBeInTheDocument();
    expect(screen.getByText("Duration:")).toBeInTheDocument();
    expect(screen.getByText("148 min")).toBeInTheDocument();
    expect(screen.getByText("Rated:")).toBeInTheDocument();
    expect(screen.getByText("PG-13")).toBeInTheDocument();
    expect(screen.getByText("Country:")).toBeInTheDocument();
    expect(screen.getByText("USA, UK")).toBeInTheDocument();
    expect(screen.getByText("8.8")).toBeInTheDocument();

    const img = screen.getByAltText("Inception") as HTMLImageElement;
    expect(img.src).toBe("https://example.com/poster.jpg");
  });

  it("displays the default poster if no poster is specified", () => {
    render(
      <MemoryRouter>
        <FilmCard movie={{ ...mockMovie, poster: undefined }} currentPage={1} />
      </MemoryRouter>
    );

    const img = screen.getByAltText("Inception") as HTMLImageElement;
    expect(img.src).toContain("defaultPoster");
  });

  it("goes to details page when clicked", async () => {
    render(
      <MemoryRouter>
        <FilmCard movie={mockMovie} currentPage={1} />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByText("Inception"));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      routes.DETAILS_INFO.replace(":id", "123"),
      { state: { movie: mockMovie, prevPage: 1 } }
    );
  });
});
