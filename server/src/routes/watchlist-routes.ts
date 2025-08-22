import express from "express";
import {
  addMovieToWatchList,
  getWatchlistByUser,
  getWatchlistByMovieId,
} from "../controllers/watchlist-controllers";
import { authGuard } from "../middlewares/auth-guard";

const watchlistRoutes = express.Router();

watchlistRoutes.post("/add", authGuard, addMovieToWatchList);
watchlistRoutes.get("/", authGuard, getWatchlistByUser);
watchlistRoutes.get("/:movieId", authGuard, getWatchlistByMovieId);

export default watchlistRoutes;
