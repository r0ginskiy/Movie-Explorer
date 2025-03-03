import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Movie } from "../../utils/types";
import FilmCard from "../FilmCard/FilmCard";
import { getFilteredFilmesAsync } from "../../store/slices/userSlice";
import Pagination from "../Pagination/Pagination";
import { useLocation } from "react-router-dom";

interface FilmListProps {
  selectedYear: string | null;
  selectedActor: string | null;
  selectedGenre: string | null;
  selectedLanguage: string | null;
  searchTitle: string;
}

const FilmList: React.FC<FilmListProps> = ({
  selectedYear,
  selectedActor,
  selectedGenre,
  selectedLanguage,
  searchTitle,
}) => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const moviesData = useAppSelector((store) => store.user.movies);
  const movies = moviesData?.movies || [];
  const totalPages = moviesData?.pagination.totalPages || 0;
  const [currentPage, setCurrentPage] = useState<number>(() => {
    return state?.page || 1;
  });
  const token = useAppSelector((store) => store.user.token);

  useEffect(() => {
    dispatch(
      getFilteredFilmesAsync({
        token: token,
        filters: {
          year: selectedYear ? parseInt(selectedYear) : undefined,
          genres: selectedGenre ? encodeURIComponent(selectedGenre) : undefined,
          actor: selectedActor ? encodeURIComponent(selectedActor) : undefined,
          language: selectedLanguage
            ? encodeURIComponent(selectedLanguage)
            : undefined,
          title: searchTitle ? encodeURIComponent(searchTitle) : undefined,
          page: currentPage,
        },
      })
    );
  }, [currentPage, dispatch, token]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10 ">
        {movies.map((movie: Movie, id: number) => (
          <FilmCard key={id} movie={movie} currentPage={currentPage} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default FilmList;
