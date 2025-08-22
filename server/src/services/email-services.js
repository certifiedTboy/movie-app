"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpToUserEmail = void 0;
const smtp_config_1 = require("../utils/smtp-config");
const config_1 = __importDefault(require("../config"));
const { EMAIL_USER } = config_1.default;
const sendOtpToUserEmail = async (userEmail, otp) => {
    try {
        await smtp_config_1.transport.sendMail({
            from: EMAIL_USER,
            to: userEmail,
            subject: "OTP Verification",
            html: `<p>Your OTP is <strong>${otp}</strong>. Please use this to verify your email address.</p>`,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendOtpToUserEmail = sendOtpToUserEmail;
