import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import FilmList from "../../components/FilmList/FilmList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

vi.mock("../../store/hooks", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("../../components/FilmCard/FilmCard", () => ({
  default: ({ movie }: { movie: { title: string } }) => (
    <div>{movie.title}</div>
  ),
}));

vi.mock("../../components/Pagination/Pagination", () => ({
  default: ({ onPageChange }: { onPageChange: (page: number) => void }) => (
    <button onClick={() => onPageChange(2)}>Next</button>
  ),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue({
      pathname: "/films",
      search: "",
      hash: "",
      state: { page: 1 },
      key: "test-key",
    }),
    MemoryRouter: actual.MemoryRouter,
  };
});

describe("FilmList", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (vi.mocked(useAppDispatch) as any).mockReturnValue(mockDispatch);
    (vi.mocked(useAppSelector) as any).mockImplementation((selector: any) =>
      selector({
        user: {
          movies: {
            movies: [
              { id: 1, title: "Movie 1" },
              { id: 2, title: "Movie 2" },
            ],
            pagination: { totalPages: 3 },
          },
          token: "fake-token",
        },
      })
    );
  });

  it("should render FilmList correctly with movies", () => {
    render(
      <MemoryRouter>
        <FilmList
          selectedYear={null}
          selectedActor={null}
          selectedGenre={null}
          selectedLanguage={null}
          searchTitle=""
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("should change page on Pagination button click", () => {
    render(
      <MemoryRouter>
        <FilmList
          selectedYear={null}
          selectedActor={null}
          selectedGenre={null}
          selectedLanguage={null}
          searchTitle=""
        />
      </MemoryRouter>
    );
    const nextPageButton = screen.getByText("Next");
    fireEvent.click(nextPageButton);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
