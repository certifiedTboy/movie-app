"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAccessToken = exports.login = void 0;
const custom_exception_1 = require("../lib/exceptions/custom-exception");
const user_services_1 = require("./user-services");
const password_helpers_1 = require("../helpers/password-helpers");
const auth_helpers_1 = require("../helpers/auth-helpers");
const login = async (email, password) => {
    const userExist = await (0, user_services_1.checkIfUserExistByEmail)(email);
    if (!userExist) {
        throw new custom_exception_1.CustomException(404, "user with email does not exist");
    }
    if (!userExist.isVerified) {
        throw new custom_exception_1.CustomException(403, "you are yet to verify your email address");
    }
    const passwordMatch = await (0, password_helpers_1.comparePassword)(password, userExist.password);
    if (!passwordMatch) {
        throw new custom_exception_1.CustomException(403, "invalid login credentials");
    }
    const accessToken = (0, auth_helpers_1.generateAccessToken)({
        userId: userExist.id.toString(),
        email: userExist.email,
    });
    const refreshToken = (0, auth_helpers_1.generateRefreshToken)({
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
exports.login = login;
const newAccessToken = async (userId) => {
    const userExist = await (0, user_services_1.checkIfUserExistById)(userId);
    if (!userExist) {
        throw new custom_exception_1.CustomException(400, "Something went wrong");
    }
    const newAccessToken = (0, auth_helpers_1.generateAccessToken)({
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
exports.newAccessToken = newAccessToken;
