import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "../lib/redux/userSlice";
import { movieApis } from "../lib/rtk-movie-apis";
import { authApis } from "../lib/authApis";
import { watchlistApis } from "../lib/watchlistApis";

/**
 * Redux store configuration
 * This file sets up the Redux store with the necessary reducers and middleware.
 * It uses Redux Toolkit for easier configuration and management.
 * The store is exported for use in the application.
 */
export const store = configureStore({
  reducer: {
    // Add your reducers here
    [movieApis.reducerPath]: movieApis.reducer,
    [authApis.reducerPath]: authApis.reducer,
    [watchlistApis.reducerPath]: watchlistApis.reducer,
    userState: userSlice,
  },

  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieApis.middleware,
      authApis.middleware,
      watchlistApis.middleware
    ),
});

setupListeners(store.dispatch);
