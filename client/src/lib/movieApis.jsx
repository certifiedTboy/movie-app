const API_KEY = import.meta.env.VITE_API_KEY;

// const API_KEY = "";

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const data = await response.json();

    return { data: data?.results };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=recommendations`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const data = await response.json();

    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
