import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, Mock } from "vitest";
import FilterItem from "../../components/Filter/FilterItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getFilteredFilmesAsync } from "../../store/slices/userSlice";

vi.mock("../../components/Filter/FilterInput", () => ({
  default: vi.fn(({ id, options, label, onChange }) => (
    <div data-testid={`autocomplete-${id}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        data-testid={`input-${id}`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )),
}));

vi.mock("../../store/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("../../store/slices/userSlice", () => ({
  getFilteredFilmesAsync: vi.fn(),
}));

describe("FilterItem component", () => {
  const mockDispatch = vi.fn();
  const mockToken = "mock-token";
  const mockMetadata = {
    years: [2020, 2021, 2022],
    actors: ["Actor 1", "Actor 2"],
    genres: ["Action", "Comedy"],
    languages: ["English", "Spanish"],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as Mock).mockReturnValue(mockDispatch);
    (useAppSelector as Mock).mockImplementation((selector) => {
      if (selector.name === "user") {
        return {
          token: mockToken,
          metadata: { data: mockMetadata },
        };
      }
      return undefined;
    });
  });

  it("renders the FilterItem component correctly", () => {
    render(
      <FilterItem
        selectedYear={null}
        setSelectedYear={vi.fn()}
        selectedActor={null}
        setSelectedActor={vi.fn()}
        selectedGenre={null}
        setSelectedGenre={vi.fn()}
        selectedLanguage={null}
        setSelectedLanguage={vi.fn()}
        searchTitle=""
        setSearchTitle={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Actors")).toBeInTheDocument();
    expect(screen.getByText("Genres")).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
  });

  it("updates the search input value", () => {
    const setSearchTitle = vi.fn();
    render(
      <FilterItem
        selectedYear={null}
        setSelectedYear={vi.fn()}
        selectedActor={null}
        setSelectedActor={vi.fn()}
        selectedGenre={null}
        setSelectedGenre={vi.fn()}
        selectedLanguage={null}
        setSelectedLanguage={vi.fn()}
        searchTitle=""
        setSearchTitle={setSearchTitle}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(searchInput, { target: { value: "Movie 1" } });
    expect(setSearchTitle).toHaveBeenCalledWith("Movie 1");
  });

  it("dispatches getFilteredFilmesAsync when the search button is clicked", () => {
    render(
      <FilterItem
        selectedYear="2020"
        setSelectedYear={vi.fn()}
        selectedActor="Actor 1"
        setSelectedActor={vi.fn()}
        selectedGenre="Action"
        setSelectedGenre={vi.fn()}
        selectedLanguage="English"
        setSelectedLanguage={vi.fn()}
        searchTitle="Movie 1"
        setSearchTitle={vi.fn()}
      />
    );

    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      getFilteredFilmesAsync({
        token: mockToken,
        filters: {
          year: 2020,
          genres: "Action",
          actor: "Actor 1",
          language: "English",
          title: "Movie 1",
          page: 1,
        },
      })
    );
  });

  it("calls the onChange handlers for AutocompleteFilter components", () => {
    const setSelectedYear = vi.fn();
    const setSelectedActor = vi.fn();
    const setSelectedGenre = vi.fn();
    const setSelectedLanguage = vi.fn();

    render(
      <FilterItem
        selectedYear={null}
        setSelectedYear={setSelectedYear}
        selectedActor={null}
        setSelectedActor={setSelectedActor}
        selectedGenre={null}
        setSelectedGenre={setSelectedGenre}
        selectedLanguage={null}
        setSelectedLanguage={setSelectedLanguage}
        searchTitle=""
        setSearchTitle={vi.fn()}
      />
    );

    const yearInput = screen.getByTestId("input-year-filter");
    fireEvent.change(yearInput, { target: { value: "2021" } });
    expect(setSelectedYear).toHaveBeenCalledWith("2021");

    const actorInput = screen.getByTestId("input-actor-filter");
    fireEvent.change(actorInput, { target: { value: "Actor 2" } });
    expect(setSelectedActor).toHaveBeenCalledWith("Actor 2");

    const genreInput = screen.getByTestId("input-genres-filter");
    fireEvent.change(genreInput, { target: { value: "Comedy" } });
    expect(setSelectedGenre).toHaveBeenCalledWith("Comedy");

    const languageInput = screen.getByTestId("input-languages-filter");
    fireEvent.change(languageInput, { target: { value: "Spanish" } });
    expect(setSelectedLanguage).toHaveBeenCalledWith("Spanish");
  });
});
