import { useEffect } from "react";
import { useFetchPopularMoviesMutation } from "../../lib/rtk-movie-apis";
import Card from "./Card";

import Loader from "../common/Loader";

const MovieList = () => {
  const [fetchPopularMovies, { isLoading, isError, isSuccess, error, data }] =
    useFetchPopularMoviesMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPopularMovies(1);
    }, 500);

    return () => {
      return clearTimeout(timer);
    };
  }, []);

  console.log(error);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader />
        </div>
      )}
      {isSuccess && data?.results?.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-between items-center mx-[50px] my-[100px] gap-7">
          {data?.results.map((movie) => {
            return (
              <Card
                title={movie.original_title}
                description={movie.overview}
                imageUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                key={movie.id}
                movieId={movie.id}
              />
            );
          })}
        </section>
      )}

      {isError && (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-red-500 font-bold text-[18px]">
            {error?.status === 401
              ? "something went wrong"
              : error?.data?.status_message}
          </h1>
        </div>
      )}
    </>
  );
};

export default MovieList;
