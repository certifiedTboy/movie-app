import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../lib/response-handler";
import {
  newWatchlist,
  watchlistByUser,
  watchlistByMovieId,
} from "../services/watchlist-services";
import { getPagination } from "../helpers/pagination";
import { CustomException } from "../lib/exceptions/custom-exception";

export const addMovieToWatchList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId!;
    const { movieId, movieTitle, overview, posterPath } = req.body;

    // add movie to watchlist
    const result = await newWatchlist({
      movieId,
      userId,
      movieTitle,
      overview,
      posterPath,
    });

    ResponseHandler.created(res, 201, result, "Movie added to watchlist");
  } catch (error: unknown) {
    if (error instanceof CustomException) {
      next(error);
    } else {
      next(new CustomException(500, "Internal Server Error"));
    }
  }
};

export const getWatchlistByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId!;

    const page = +req.query.page!;
    const pageLimit = +req.query.limit!;

    const { offset, limit } = getPagination({ page, limit: pageLimit });

    const watchlist = await watchlistByUser(userId, offset, limit);
    ResponseHandler.ok(res, 200, watchlist, "Watchlist retrieved successfully");
  } catch (error: unknown) {
    if (error instanceof CustomException) {
      next(error);
    } else {
      next(new CustomException(500, "Internal Server Error"));
    }
  }
};

export const getWatchlistByMovieId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { movieId } = req.params;

    const userId = req.user?.userId!;

    const watchlist = await watchlistByMovieId(movieId, userId);

    ResponseHandler.ok(res, 200, watchlist, "Watchlist found");
  } catch (error: unknown) {
    if (error instanceof CustomException) {
      next(error);
    } else {
      next(new CustomException(500, "Internal Server Error"));
    }
  }
};
