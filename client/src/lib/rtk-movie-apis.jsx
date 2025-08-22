import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.themoviedb.org/3/movie/";

const API_KEY = import.meta.env.VITE_API_KEY;

export const movieApis = createApi({
  reducerPath: "movieApis",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      headers.set("accept", "application/json");
      headers.set("Authorization", `Bearer ${API_KEY}`);

      return headers;
    },
  }),

  endpoints: (builder) => ({
    fetchPopularMovies: builder.mutation({
      query: (payload) => ({
        url: `popular?language=en-US&page=${payload}`,
        method: "GET",
      }),
    }),

    fetchMovieDetails: builder.mutation({
      query: (payload) => ({
        url: `https://api.themoviedb.org/3/movie/${payload}?api_key=${API_KEY}&append_to_response=recommendations`,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchPopularMoviesMutation, useFetchMovieDetailsMutation } =
  movieApis;
