"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("../config"));
const { EMAIL_USER, EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_REFRESH_TOKEN, EMAIL_ACCESS_TOKEN, EMAIL_REDIRECT_URI, SMTP_HOST, } = config_1.default;
const OAuth2 = googleapis_1.google.auth.OAuth2;
const myOauth2Client = new OAuth2(EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_REDIRECT_URI);
myOauth2Client.setCredentials({
    refresh_token: EMAIL_REFRESH_TOKEN,
});
exports.transport = nodemailer_1.default.createTransport({
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
