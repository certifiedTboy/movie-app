import express from "express";
import {
  createNewUser,
  VerifyUserAccount,
  getCurrentUser,
} from "../controllers/user-controllers";
import {
  userDataValidators,
  userVerificationValidator,
  checkValidationErrors,
} from "../middlewares/data-validator";
import { authGuard } from "../middlewares/auth-guard";
const userRoutes = express.Router();

userRoutes.post("/", userDataValidators, checkValidationErrors, createNewUser);
userRoutes.put(
  "/verify",
  userVerificationValidator,
  checkValidationErrors,
  VerifyUserAccount
);

userRoutes.get("/me", authGuard, getCurrentUser);
export default userRoutes;
