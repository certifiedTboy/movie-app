"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWatchlistByMovieId = exports.getWatchlistByUser = exports.addMovieToWatchList = void 0;
const response_handler_1 = require("../lib/response-handler");
const watchlist_services_1 = require("../services/watchlist-services");
const pagination_1 = require("../helpers/pagination");
const custom_exception_1 = require("../lib/exceptions/custom-exception");
const addMovieToWatchList = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const { movieId, movieTitle, overview, posterPath } = req.body;
        // add movie to watchlist
        const result = await (0, watchlist_services_1.newWatchlist)({
            movieId,
            userId,
            movieTitle,
            overview,
            posterPath,
        });
        response_handler_1.ResponseHandler.created(res, 201, result, "Movie added to watchlist");
    }
    catch (error) {
        if (error instanceof custom_exception_1.CustomException) {
            next(error);
        }
        else {
            next(new custom_exception_1.CustomException(500, "Internal Server Error"));
        }
    }
};
exports.addMovieToWatchList = addMovieToWatchList;
const getWatchlistByUser = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const page = +req.query.page;
        const pageLimit = +req.query.limit;
        const { offset, limit } = (0, pagination_1.getPagination)({ page, limit: pageLimit });
        const watchlist = await (0, watchlist_services_1.watchlistByUser)(userId, offset, limit);
        response_handler_1.ResponseHandler.ok(res, 200, watchlist, "Watchlist retrieved successfully");
    }
    catch (error) {
        if (error instanceof custom_exception_1.CustomException) {
            next(error);
        }
        else {
            next(new custom_exception_1.CustomException(500, "Internal Server Error"));
        }
    }
};
exports.getWatchlistByUser = getWatchlistByUser;
const getWatchlistByMovieId = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const userId = req.user?.userId;
        const watchlist = await (0, watchlist_services_1.watchlistByMovieId)(movieId, userId);
        response_handler_1.ResponseHandler.ok(res, 200, watchlist, "Watchlist found");
    }
    catch (error) {
        if (error instanceof custom_exception_1.CustomException) {
            next(error);
        }
        else {
            next(new custom_exception_1.CustomException(500, "Internal Server Error"));
        }
    }
};
exports.getWatchlistByMovieId = getWatchlistByMovieId;
