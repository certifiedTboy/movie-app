import WatchList from "../models/watchlist-models";
import { checkIfUserExistById } from "./user-services";
import { CustomException } from "../lib/exceptions/custom-exception";

export const newWatchlist = async (watchListData: {
  movieId: string;
  userId: string;
  movieTitle: string;
  overview: string;
  posterPath: string;
}) => {
  const userExist = await checkIfUserExistById(watchListData.userId);

  if (!userExist) {
    throw new CustomException(404, "User not found");
  }

  const watchlistExist = await WatchList.findOne({
    movieId: watchListData.movieId,
  });

  if (watchlistExist) {
    // remove the movie from watchlist

    const deletedMovie = await WatchList.findByIdAndDelete(
      watchlistExist._id.toString()
    );

    return deletedMovie;
  }

  const watchlist = await WatchList.create({
    ...watchListData,
    user: userExist._id,
  });

  return watchlist;
};

export const watchlistByUser = async (
  userId: string,
  offset: number,
  limit: number
) => {
  const watchlist = await WatchList.find({ user: userId })
    .populate("user", "firstName lastName email isVerified")
    .skip(offset)
    .limit(limit);
  return watchlist;
};

export const watchlistByMovieId = async (movieId: string, userId: string) => {
  const watchlist = await WatchList.findOne({ movieId, user: userId });

  if (!watchlist) {
    throw new CustomException(404, "Watchlist not found");
  }
  return watchlist;
};
