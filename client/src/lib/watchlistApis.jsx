import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const watchlistApis = createApi({
  reducerPath: "watchlistApis",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const refreshToken = localStorage.getItem("refresh_token");

      headers.set("accept", "application/json");
      if (refreshToken) {
        headers.set("Authorization", `Bearer ${refreshToken}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    addMovieToWatchlist: builder.mutation({
      query: (payload) => ({
        url: `/watchlist/add`,
        method: "POST",
        body: payload,
        credentials: "include",
      }),
    }),

    getWatchlistByUser: builder.mutation({
      query: () => ({
        url: "/watchlist",
        method: "GET",
        credentials: "include",
      }),
    }),

    getWatchlistByMovieId: builder.mutation({
      query: (movieId) => ({
        url: `/watchlist/${movieId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddMovieToWatchlistMutation,
  useGetWatchlistByUserMutation,
  useGetWatchlistByMovieIdMutation,
} = watchlistApis;
