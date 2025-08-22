import { Request, Response, NextFunction } from "express";
import { CustomException } from "../lib/exceptions/custom-exception";
import {
  createUser,
  verifyAccount,
  checkIfUserExistById,
} from "../services/user-services";
import { ResponseHandler } from "../lib/response-handler";

/**
 * @function createNewUser
 * @description Create a new user
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extract user data from request body

    const { firstName, lastName, email, password } = req.body;

    // create a new user and send back a reponse to the client
    const createdUser = await createUser({
      firstName,
      lastName,
      email,
      password,
    });

    ResponseHandler.created(res, 201, createdUser, "user created successfully");
  } catch (error) {
    if (error instanceof CustomException) {
      return next(error);
    }

    next(new CustomException(500, "Internal server error"));
  }
};

export const VerifyUserAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp } = req.body;

    const verifiedUser = await verifyAccount(otp);

    ResponseHandler.ok(
      res,
      200,
      verifiedUser,
      "user account verified successfully"
    );
  } catch (error) {
    if (error instanceof CustomException) {
      return next(error);
    }

    next(new CustomException(500, "Internal server error"));
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await checkIfUserExistById(req.user?.userId!);

    if (!currentUser) {
      throw new CustomException(404, "User not found");
    }

    ResponseHandler.ok(
      res,
      200,
      currentUser,
      "Current user retrieved successfully"
    );
  } catch (error: unknown) {
    if (error instanceof CustomException) {
      return next(error);
    }

    next(new CustomException(500, "Internal server error"));
  }
};
