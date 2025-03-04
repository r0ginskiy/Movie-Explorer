import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CardDetails from "../../components/DetailsCard/CardDetails";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => ({
      state: {
        movie: {
          title: "Test Movie",
          released: "2023-01-01",
          genres: ["Action", "Drama"],
          runtime: 120,
          languages: ["English", "French"],
          rated: "PG-13",
          cast: ["Actor 1", "Actor 2"],
          plot: "This is a test plot",
          awards: { text: "Best Movie", wins: 3, nominations: 5 },
          imdb: { rating: 8.5, votes: 12000 },
          tomatoes: {
            viewer: { rating: 4.5, numReviews: 5000 },
            critic: { rating: 7.8, numReviews: 300 },
          },
        },
        prevPage: 1,
      },
    }),
  };
});

describe("CardDetails component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CardDetails />
      </MemoryRouter>
    );
  });

  it("renders movie title", () => {
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("displays release date correctly", () => {
    expect(screen.getByText("Release Date: 01.01.2023")).toBeInTheDocument();
  });

  it("displays genres", () => {
    expect(screen.getByText("Genres: Action, Drama")).toBeInTheDocument();
  });

  it("displays runtime", () => {
    expect(screen.getByText("Runtime: 120 min")).toBeInTheDocument();
  });

  it("displays languages", () => {
    expect(screen.getByText("Languages: English, French")).toBeInTheDocument();
  });

  it("displays IMDb rating", () => {
    const imdbSection = screen.getByText(/IMDb Rating/i).closest("div");
    expect(within(imdbSection!).getByText(/8.5/)).toBeInTheDocument();
    expect(
      within(imdbSection!).getByText(/\d{1,3}(,\d{3})*\s?votes/)
    ).toBeInTheDocument();
  });

  it("displays movie plot", () => {
    expect(screen.getByText("This is a test plot")).toBeInTheDocument();
  });

  it("displays cast list", () => {
    expect(screen.getByText("Actor 1, Actor 2")).toBeInTheDocument();
  });

  it("displays awards", () => {
    expect(screen.getByText("Best Movie")).toBeInTheDocument();
    expect(screen.getByText("Wins: 3, Nominations: 5")).toBeInTheDocument();
  });
});
