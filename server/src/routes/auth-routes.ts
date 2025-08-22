import express from "express";
import {
  loginUser,
  generateNewAccessToken,
  logoutUser,
} from "../controllers/auth-controllers";
import { authGuard2, authGuard } from "../middlewares/auth-guard";
const authRoutes = express.Router();

authRoutes.post("/login", loginUser);
authRoutes.get("/new-access-token", authGuard2, generateNewAccessToken);
authRoutes.post("/logout", authGuard, logoutUser);

export default authRoutes;
