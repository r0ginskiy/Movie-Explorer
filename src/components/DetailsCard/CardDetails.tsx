import { useLocation } from "react-router-dom";
import { Movie } from "../../utils/types";
import { defaultPoster } from "../../utils/constants";
import {
  Star,
  Calendar,
  Clock,
  Globe,
  Film,
  Users,
  Award,
  Ticket,
} from "lucide-react";
import ReturnButton from "../ReturnButton/ReturnButton";
import { format } from "date-fns";


const CardDetails = () => {
  const { state } = useLocation();
  const movie: Movie = state?.movie;
  const prevPage: number = state?.prevPage || 1;

  return (
    <div className="w-full min-h-screen bg-[rgb(236,246,246)] flex items-center justify-center relative p-6">
      <div className="absolute top-6 left-10">
        <ReturnButton prevPage={prevPage}/>
      </div>

      <div className="w-full max-w-[90vh] h-auto bg-white p-3 rounded-lg shadow-xl flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 flex-none">
          <img
            src={movie.poster || defaultPoster}
            alt={movie.title}
            className="w-full h-full object-scale-down"
          />
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-4xl font-bold text-gray-800">{movie.title}</h1>
          <p className="text-gray-500 mt-2 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-gray-600" />
            Release Date:{" "}
            {movie.released
              ? format(new Date(movie.released), "dd.MM.yyyy")
              : "Unknown"}
          </p>
          <p className="text-gray-500 flex items-center">
            <Film className="w-5 h-5 mr-2 text-gray-600" />
            Genres: {movie.genres?.join(", ")}
          </p>
          <p className="text-gray-500 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-600" />
            Runtime: {movie.runtime} min
          </p>
          <p className="text-gray-500 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-gray-600" />
            Languages: {movie.languages?.join(", ")}
          </p>
          <p className="text-gray-500 flex items-center">
            <Ticket className="w-5 h-5 mr-2 text-gray-600" />
            Rated: {movie.rated}
          </p>

          <hr className="my-4 border-gray-300" />

          <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
            <Users className="w-6 h-6 mr-2 text-gray-600" />
            Cast
          </h3>
          <p className="text-gray-700">{movie.cast?.join(", ")}</p>

          <hr className="my-4 border-gray-300" />

          <h3 className="text-2xl font-semibold text-gray-800">Plot</h3>
          <p className="text-gray-700">{movie.plot}</p>

          {movie.awards && (
            <>
              {(movie.cast || movie.plot || movie.fullplot) && (
                <hr className="my-4 border-gray-300" />
              )}
              <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                <Award className="w-6 h-6 mr-2 text-gray-600" />
                Awards
              </h3>
              {movie.awards.text && (
                <p className="text-gray-700">{movie.awards.text}</p>
              )}
              {(movie.awards.wins || movie.awards.nominations) && (
                <p className="text-gray-500">
                  {movie.awards.wins && `Wins: ${movie.awards.wins}`}
                  {movie.awards.wins && movie.awards.nominations && ", "}
                  {movie.awards.nominations &&
                    `Nominations: ${movie.awards.nominations}`}
                </p>
              )}
            </>
          )}

          {movie.imdb?.rating && (
            <>
              <hr className="my-4 border-gray-300" />
              <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                IMDb Rating
              </h3>
              {(movie.imdb.rating || movie.imdb.votes) && (
                <p className="text-gray-700">
                  {movie.imdb.rating && movie.imdb.rating}
                  {movie.imdb.votes &&
                    ` (${movie.imdb.votes.toLocaleString()} votes)`}
                </p>
              )}
            </>
          )}

          {movie.tomatoes && (
            <>
              <hr className="my-4 border-gray-300" />
              <h3 className="text-2xl font-semibold text-gray-800">
                <span className="text-2xl">🍅</span>
                Rotten Tomatoes
              </h3>
              {movie.tomatoes.viewer && (
                <p className="text-gray-700">
                  Viewer:{" "}
                  {movie.tomatoes.viewer.rating &&
                    `${movie.tomatoes.viewer.rating} / 5`}
                  {movie.tomatoes.viewer.numReviews &&
                    ` (${movie.tomatoes.viewer.numReviews.toLocaleString()} reviews)`}
                </p>
              )}
              {movie.tomatoes.critic && (
                <p className="text-gray-700">
                  Critic:{" "}
                  {movie.tomatoes.critic.rating &&
                    `${movie.tomatoes.critic.rating} / 10`}
                  {movie.tomatoes.critic.numReviews &&
                    ` (${movie.tomatoes.critic.numReviews.toLocaleString()} reviews)`}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
