import { useState, useEffect } from "react";
import Card from "./Card";
import { fetchPopularMovies } from "../../lib/movieApis";
import Loader from "../common/Loader";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const searchInputRef = useRef();
  // const pageRef = useRef(10);

  // const onSearch = () => {
  //   let searchData = searchInputRef.current.value;

  //   // console.log(searchData);

  //   console.log(pageRef.current);
  // };

  const onFetchPopularMovies = async () => {
    setIsLoading(true);
    const result = await fetchPopularMovies();
    if (result?.error) {
      setIsLoading(false);
      return setErrorMessage(result.error);
    }

    setIsLoading(false);
    return setMovies(result?.data);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onFetchPopularMovies();
    }, 500);

    return () => {
      return clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader />
        </div>
      )}
      {movies && movies.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-between items-center mx-[50px] my-[100px] gap-7">
          {movies.map((movie) => {
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

      {errorMessage && (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-red-500 font-bold text-[18px]">{errorMessage}</h1>
        </div>
      )}
    </>
  );
};

export default MovieList;
