import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
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

    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const WatchList = mongoose.model("watchlist", watchlistSchema);

export default WatchList;
