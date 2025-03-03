import { Movie } from "../../utils/types";
import { defaultPoster } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

interface FilmCardProps {
  movie: Movie;
  currentPage: number;
}

const FilmCard = ({ movie, currentPage }: FilmCardProps) => {
  const { _id, title, poster, year, imdb, genres, runtime, rated, countries } =
    movie;

  const navigate = useNavigate();
  const handleDetailsFilmClick = (_id: string) => {
    navigate(routes.DETAILS_INFO.replace(":id", _id.toString()), {
      state: { movie, prevPage: currentPage },
    });
  };

  return (
    <div
      key={_id}
      className="max-w-[320px] min-w-0 h-full pt-2 flex flex-col rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-2xl hover:scale-105 relative"
      onClick={() => handleDetailsFilmClick(_id)}
    >
      <img
        src={poster || defaultPoster}
        alt={title}
        className="w-full h-64 object-scale-down flex-shrink-0"
      />

      {imdb?.rating && (
        <div className="absolute top-4 right-4 bg-yellow-400 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {imdb.rating.toFixed(1)}
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-500 mt-1">
          <span className="font-semibold text-gray-700">Year: </span>
          {year}
        </p>

        {genres && (
          <p className="text-gray-500 mt-1">
            <span className="font-semibold text-gray-700">Genres: </span>
            {genres.join(", ")}
          </p>
        )}

        <p className="text-gray-500 mt-1">
          <span className="font-semibold text-gray-700">Duration: </span>
          {runtime} min
        </p>
        {rated && (
          <p className="text-gray-500 mt-1">
            <span className="font-semibold text-gray-700">Rated: </span>
            {rated}
          </p>
        )}
        {countries && (
          <p className="text-gray-500 mt-1">
            <span className="font-semibold text-gray-700">Country: </span>
            {countries.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default FilmCard;
