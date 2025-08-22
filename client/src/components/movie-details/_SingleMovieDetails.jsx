import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../lib/movieApis";

const SingleMovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const onFetchMovieDetails = async () => {
      const result = await fetchMovieDetails(movieId);

      if (result?.data) {
        return setMovieDetails(result.data);
      }
    };
    const timer = setTimeout(() => {
      if (movieId) {
        onFetchMovieDetails();
      }
      500;
    }, []);

    return () => clearTimeout(timer);
  }, [movieId]);
  return (
    <section className="mt-[100px] grid grid-cols-2">
      <div>
        <p>{movieDetails.overview}</p>
      </div>
      <div>
        {movieDetails?.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
          />
        )}
      </div>
    </section>
  );
};

export default SingleMovieDetails;
