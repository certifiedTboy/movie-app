"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const watchlistSchema = new mongoose_1.default.Schema({
    movieId: {
        type: String,
        required: [true, "movie id is required"],
        unique: true,
    },
    movieTitle: {
        type: String,
        required: [true, "movie title is required"],
    },
    overview: {
        type: String,
        required: [true, "movie overview is required"],
    },
    posterPath: {
        type: String,
        required: [true, "movie poster path is required"],
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true });
const WatchList = mongoose_1.default.model("watchlist", watchlistSchema);
exports.default = WatchList;
