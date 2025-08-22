import jwt from "jsonwebtoken";
import { CustomException } from "../lib/exceptions/custom-exception";
import envVariables from "../config";

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} = envVariables;

export const generateAccessToken = (payload: {
  userId: string;
  email: string;
}) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (payload: {
  userId: string;
  email: string;
}) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "5d" });
};

export const verifyAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);

    return payload;
  } catch (error) {
    throw new CustomException(401, "jwt expired");
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);

    return payload;
  } catch (error) {
    throw new CustomException(401, "jwt expired");
  }
};
