import { CustomException } from "../lib/exceptions/custom-exception";
import { hashPassword } from "../helpers/password-helpers";
import User from "../models/user-model";
import { sendOtpToUserEmail } from "./email-services";
import { generateOtp } from "../helpers/random-code-generator";

export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  // check if user with email address already exist
  // if a user with the email already exist, we throw an error
  const userExist = await checkIfUserExistByEmail(userData.email);

  if (userExist && userExist.isVerified) {
    throw new CustomException(403, "user with email already exist");
  }

  if (userExist && !userExist.isVerified) {
    const otp = generateOtp();
    userExist.verificationToken = otp;
    userExist.verificationTokenExpiresIn = new Date(Date.now() + 60 * 1000);
    await userExist.save();

    await sendOtpToUserEmail(userExist.email, otp);

    return userExist;
  }

  const hashedPassword = await hashPassword(userData.password);

  const otp = generateOtp();
  const user = new User({
    ...userData,
    password: hashedPassword,
    verificationToken: otp,
    verificationTokenExpiresIn: new Date(Date.now() + 30 * 60 * 1000),
  });

  await user.save();

  if (!user) {
    throw new CustomException(400, "user creation failed");
  }

  await sendOtpToUserEmail(user.email, otp);

  return user;
};

export const checkIfUserExistByEmail = async (email: string) => {
  const userExist = await User.findOne({ email });

  return userExist;
};

export const checkIfUserExistById = async (userId: string) => {
  const userExist = await User.findById(userId).select(
    "-password -__v -verificationToken -verificationTokenExpiresIn -passwordResetToken -passwordResetTokenExpiresIn -createdAt -updatedAt"
  );

  return userExist;
};

export const verifyAccount = async (otp: string) => {
  const user = await User.findOne({ verificationToken: otp });

  if (!user) {
    throw new CustomException(404, "invalid otp");
  }

  const currentTime = new Date();
  if (!user.verificationTokenExpiresIn) {
    throw new CustomException(400, "verification token is expired");
  }
  const timeInMinute =
    new Date(user.verificationTokenExpiresIn).getTime() + 30 * 60 * 1000;

  if (currentTime.getTime() > timeInMinute) {
    await User.findByIdAndDelete(user._id.toString());
    throw new CustomException(400, "verification token is expired");
  }

  const verifiedUser = await User.findByIdAndUpdate(
    user._id.toString(),
    {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiresIn: null,
    },
    { new: true }
  );

  return verifiedUser;
};
