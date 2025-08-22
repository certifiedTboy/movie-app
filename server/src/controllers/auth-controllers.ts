import { Request, Response, NextFunction } from "express";
import { CustomException } from "../lib/exceptions/custom-exception";
import { login, newAccessToken } from "../services/auth-services";
import { ResponseHandler } from "../lib/response-handler";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const loginData = await login(email, password);

    ResponseHandler.auth(res, loginData, "User logged in successfully");
  } catch (error) {
    if (error instanceof CustomException) {
      next(error);
    }

    next(new CustomException(500, "Internal Server Error"));
  }
};

export const generateNewAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await newAccessToken(req?.user?.userId!);

    if (result) {
      ResponseHandler.auth(
        res,
        result,
        "New access token generated successfully"
      );
    }
  } catch (error) {
    if (error instanceof CustomException) {
      next(error);
    }

    next(new CustomException(500, "Internal Server Error"));
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    ResponseHandler.logout(res, "User logged out successfully");
  } catch (error) {
    if (error instanceof CustomException) {
      next(error);
    }

    next(new CustomException(500, "Internal Server Error"));
  }
};
