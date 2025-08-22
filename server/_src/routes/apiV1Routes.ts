import express from "express";
import userRoutes from "./user-routes";
import authRoutes from "./auth-routes";
import watchlistRoutes from "./watchlist-routes";
const apiV1Routes = express.Router();

apiV1Routes.use("/users", userRoutes);
apiV1Routes.use("/auth", authRoutes);
apiV1Routes.use("/watchlist", watchlistRoutes);

export default apiV1Routes;
