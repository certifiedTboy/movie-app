import { transport } from "../utils/smtp-config";
import envVariables from "../config";

const { EMAIL_USER } = envVariables;

export const sendOtpToUserEmail = async (userEmail: string, otp: string) => {
  try {
    await transport.sendMail({
      from: EMAIL_USER,
      to: userEmail,
      subject: "OTP Verification",
      html: `<p>Your OTP is <strong>${otp}</strong>. Please use this to verify your email address.</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};
