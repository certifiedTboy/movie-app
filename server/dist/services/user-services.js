"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccount = exports.checkIfUserExistById = exports.checkIfUserExistByEmail = exports.createUser = void 0;
const custom_exception_1 = require("../lib/exceptions/custom-exception");
const password_helpers_1 = require("../helpers/password-helpers");
const user_model_1 = __importDefault(require("../models/user-model"));
const email_services_1 = require("./email-services");
const random_code_generator_1 = require("../helpers/random-code-generator");
const createUser = async (userData) => {
    // check if user with email address already exist
    // if a user with the email already exist, we throw an error
    const userExist = await (0, exports.checkIfUserExistByEmail)(userData.email);
    if (userExist && userExist.isVerified) {
        throw new custom_exception_1.CustomException(403, "user with email already exist");
    }
    if (userExist && !userExist.isVerified) {
        const otp = (0, random_code_generator_1.generateOtp)();
        userExist.verificationToken = otp;
        userExist.verificationTokenExpiresIn = new Date(Date.now() + 60 * 1000);
        await userExist.save();
        await (0, email_services_1.sendOtpToUserEmail)(userExist.email, otp);
        return userExist;
    }
    const hashedPassword = await (0, password_helpers_1.hashPassword)(userData.password);
    const otp = (0, random_code_generator_1.generateOtp)();
    const user = new user_model_1.default({
        ...userData,
        password: hashedPassword,
        verificationToken: otp,
        verificationTokenExpiresIn: new Date(Date.now() + 30 * 60 * 1000),
    });
    await user.save();
    if (!user) {
        throw new custom_exception_1.CustomException(400, "user creation failed");
    }
    await (0, email_services_1.sendOtpToUserEmail)(user.email, otp);
    return user;
};
exports.createUser = createUser;
const checkIfUserExistByEmail = async (email) => {
    const userExist = await user_model_1.default.findOne({ email });
    return userExist;
};
exports.checkIfUserExistByEmail = checkIfUserExistByEmail;
const checkIfUserExistById = async (userId) => {
    const userExist = await user_model_1.default.findById(userId).select("-password -__v -verificationToken -verificationTokenExpiresIn -passwordResetToken -passwordResetTokenExpiresIn -createdAt -updatedAt");
    return userExist;
};
exports.checkIfUserExistById = checkIfUserExistById;
const verifyAccount = async (otp) => {
    const user = await user_model_1.default.findOne({ verificationToken: otp });
    if (!user) {
        throw new custom_exception_1.CustomException(404, "invalid otp");
    }
    const currentTime = new Date();
    if (!user.verificationTokenExpiresIn) {
        throw new custom_exception_1.CustomException(400, "verification token is expired");
    }
    const timeInMinute = new Date(user.verificationTokenExpiresIn).getTime() + 30 * 60 * 1000;
    if (currentTime.getTime() > timeInMinute) {
        await user_model_1.default.findByIdAndDelete(user._id.toString());
        throw new custom_exception_1.CustomException(400, "verification token is expired");
    }
    const verifiedUser = await user_model_1.default.findByIdAndUpdate(user._id.toString(), {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresIn: null,
    }, { new: true });
    return verifiedUser;
};
exports.verifyAccount = verifyAccount;
