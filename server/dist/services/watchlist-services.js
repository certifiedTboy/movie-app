"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchlistByMovieId = exports.watchlistByUser = exports.newWatchlist = void 0;
const watchlist_models_1 = __importDefault(require("../models/watchlist-models"));
const user_services_1 = require("./user-services");
const custom_exception_1 = require("../lib/exceptions/custom-exception");
const newWatchlist = async (watchListData) => {
    const userExist = await (0, user_services_1.checkIfUserExistById)(watchListData.userId);
    if (!userExist) {
        throw new custom_exception_1.CustomException(404, "User not found");
    }
    const watchlistExist = await watchlist_models_1.default.findOne({
        movieId: watchListData.movieId,
    });
    if (watchlistExist) {
        // remove the movie from watchlist
        const deletedMovie = await watchlist_models_1.default.findByIdAndDelete(watchlistExist._id.toString());
        return deletedMovie;
    }
    const watchlist = await watchlist_models_1.default.create({
        ...watchListData,
        user: userExist._id,
    });
    return watchlist;
};
exports.newWatchlist = newWatchlist;
const watchlistByUser = async (userId, offset, limit) => {
    const watchlist = await watchlist_models_1.default.find({ user: userId })
        .populate("user", "firstName lastName email isVerified")
        .skip(offset)
        .limit(limit);
    return watchlist;
};
exports.watchlistByUser = watchlistByUser;
const watchlistByMovieId = async (movieId, userId) => {
    const watchlist = await watchlist_models_1.default.findOne({ movieId, user: userId });
    if (!watchlist) {
        throw new custom_exception_1.CustomException(404, "Watchlist not found");
    }
    return watchlist;
};
exports.watchlistByMovieId = watchlistByMovieId;
