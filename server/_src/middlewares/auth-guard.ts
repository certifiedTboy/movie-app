import { Request, Response, NextFunction } from "express";
import { CustomException } from "../lib/exceptions/custom-exception";
import { verifyAccessToken, verifyRefreshToken } from "../helpers/auth-helpers";

interface UserPayload {
  userId: string;
  email: string;
}

declare module "express" {
  interface Request {
    user?: UserPayload;
  }
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies["access_token"];

    if (!accessToken) {
      throw new CustomException(403, "Access token is required");
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload || typeof payload === "string") {
      throw new CustomException(401, "jwt expired");
    }

    req.user = {
      userId: (payload as any).userId,
      email: (payload as any).email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const authGuard2 = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      throw new CustomException(403, "Authorization token is required");
    }

    if (token?.split(" ")[0] !== "Bearer") {
      throw new CustomException(403, "invalid token");
    }

    const refreshToken = token.split(" ")[1];

    const payload = verifyRefreshToken(refreshToken);

    req.user = {
      userId: (payload as any).userId,
      email: (payload as any).email,
    };

    next();
  } catch (error) {
    next(error);
  }
};
