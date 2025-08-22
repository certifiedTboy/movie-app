import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAddMovieToWatchlistMutation,
  useGetWatchlistByMovieIdMutation,
} from "../../lib/watchlistApis";
import { useFetchMovieDetailsMutation } from "../../lib/rtk-movie-apis";

const SingleMovieDetails = () => {
  const { isAuthenticated } = useSelector((state) => state.userState);
  const [fetchMovieDetails, { data }] = useFetchMovieDetailsMutation();

  const [
    addMovieToWatchlist,
    { isLoading, isSuccess, data: addWatchlistData, error },
  ] = useAddMovieToWatchlistMutation();

  const [getWatchlistByMovieId, { data: watchlistData }] =
    useGetWatchlistByMovieIdMutation();

  const { movieId } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (movieId) {
        fetchMovieDetails(movieId);
      }
      500;
    }, []);

    return () => clearTimeout(timer);
  }, [movieId]);

  useEffect(() => {
    if (isAuthenticated || isSuccess) {
      getWatchlistByMovieId(movieId);
    }
  }, [isSuccess, data]);

  return (
    <section className="mt-[100px] grid grid-cols-2">
      {data?.overview && (
        <div>
          <p>{data?.overview}</p>

          <div>
            {!isAuthenticated ? (
              <Link
                to="/auth/signin"
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
              >
                Add To Watchlist
              </Link>
            ) : (
              <>
                {!watchlistData ? (
                  <button
                    onClick={() =>
                      addMovieToWatchlist({
                        movieId: data?.id.toString(),
                        movieTitle: data?.original_title,
                        overview: data?.overview,
                        posterPath: data?.poster_path,
                      })
                    }
                    type="button"
                    className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Please wait..." : "Add to Watchlist"}
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      addMovieToWatchlist({
                        movieId: data?.id.toString(),
                        movieTitle: data?.original_title,
                        overview: data?.overview,
                        posterPath: data?.poster_path,
                      })
                    }
                    type="button"
                    className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Please wait..." : "Remove from Watchlist"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div>
        {data?.poster_path && (
          <img src={`https://image.tmdb.org/t/p/w300${data?.poster_path}`} />
        )}
      </div>
    </section>
  );
};

export default SingleMovieDetails;
