import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "./redux/userSlice";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const authApis = createApi({
  reducerPath: "authApis",
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
    createNewUser: builder.mutation({
      query: (payload) => ({
        url: `/users`,
        method: "POST",
        body: payload,
      }),
    }),

    verifyUser: builder.mutation({
      query: (payload) => ({
        url: "/users/verify",
        method: "PUT",
        body: payload,
      }),
    }),

    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
        credentials: "include",
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCurrentUser(data?.data?.userData));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getNewAccessToken: builder.mutation({
      query: () => ({
        url: "/auth/new-access-token",
        method: "GET",
      }),

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCurrentUser(data?.data?.userData));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getCurrentUser: builder.mutation({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setCurrentUser(data?.data));
        } catch (error) {
          if (error?.error?.data?.status === 401) {
            dispatch(authApis.endpoints.getNewAccessToken.initiate());
          }
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useGetCurrentUserMutation,
  useLogoutMutation,
} = authApis;
