import nodemailer from "nodemailer";
import { google } from "googleapis";
import envVariables from "../config";

const {
  EMAIL_USER,
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REFRESH_TOKEN,
  EMAIL_ACCESS_TOKEN,
  EMAIL_REDIRECT_URI,
  SMTP_HOST,
} = envVariables;

const OAuth2 = google.auth.OAuth2;

const myOauth2Client = new OAuth2(
  EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET,
  EMAIL_REDIRECT_URI
);

myOauth2Client.setCredentials({
  refresh_token: EMAIL_REFRESH_TOKEN,
});

export const transport = nodemailer.createTransport({
  service: SMTP_HOST,
  auth: {
    type: "OAuth2",
    user: EMAIL_USER,
    clientId: EMAIL_CLIENT_ID,
    clientSecret: EMAIL_CLIENT_SECRET,
    refreshToken: EMAIL_REFRESH_TOKEN,
    accessToken: EMAIL_ACCESS_TOKEN,
  },
});
