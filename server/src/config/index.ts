import dotenv from "dotenv";
dotenv.config();

const envVariables = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  SMTP_HOST: process.env.EMAIL_SMTP_HOST,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_CLIENT_ID: process.env.EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN: process.env.EMAIL_REFRESH_TOKEN,
  EMAIL_ACCESS_TOKEN: process.env.EMAIL_ACCESS_TOKEN,
  EMAIL_REDIRECT_URI: process.env.EMAIL_REDIRECT_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "5d",
};

export default envVariables;
