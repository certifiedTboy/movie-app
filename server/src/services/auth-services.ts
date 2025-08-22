import { CustomException } from "../lib/exceptions/custom-exception";
import { checkIfUserExistByEmail, checkIfUserExistById } from "./user-services";
import { comparePassword } from "../helpers/password-helpers";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/auth-helpers";

export const login = async (email: string, password: string) => {
  const userExist = await checkIfUserExistByEmail(email);

  if (!userExist) {
    throw new CustomException(404, "user with email does not exist");
  }

  if (!userExist.isVerified) {
    throw new CustomException(403, "you are yet to verify your email address");
  }

  const passwordMatch = await comparePassword(password, userExist.password!);

  if (!passwordMatch) {
    throw new CustomException(403, "invalid login credentials");
  }

  const accessToken = generateAccessToken({
    userId: userExist.id.toString(),
    email: userExist.email,
  });

  const refreshToken = generateRefreshToken({
    userId: userExist._id.toString(),
    email: userExist.email,
  });

  return {
    accessToken,
    refreshToken,
    userData: {
      _id: userExist._id.toString(),
      email: userExist.email,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      isVerified: userExist.isVerified,
    },
  };
};

export const newAccessToken = async (userId: string) => {
  const userExist = await checkIfUserExistById(userId);

  if (!userExist) {
    throw new CustomException(400, "Something went wrong");
  }

  const newAccessToken = generateAccessToken({
    userId: userExist._id.toString(),
    email: userExist.email,
  });

  if (newAccessToken) {
    return {
      accessToken: newAccessToken,
      userData: {
        _id: userExist._id.toString(),
        email: userExist.email,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        isVerified: userExist.isVerified,
      },
    };
  }
};
