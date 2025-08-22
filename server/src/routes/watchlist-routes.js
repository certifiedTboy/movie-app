"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const watchlist_controllers_1 = require("../controllers/watchlist-controllers");
const auth_guard_1 = require("../middlewares/auth-guard");
const watchlistRoutes = express_1.default.Router();
watchlistRoutes.post("/add", auth_guard_1.authGuard, watchlist_controllers_1.addMovieToWatchList);
watchlistRoutes.get("/", auth_guard_1.authGuard, watchlist_controllers_1.getWatchlistByUser);
watchlistRoutes.get("/:movieId", auth_guard_1.authGuard, watchlist_controllers_1.getWatchlistByMovieId);
exports.default = watchlistRoutes;
