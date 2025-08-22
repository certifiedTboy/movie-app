"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.generateNewAccessToken = exports.loginUser = void 0;
const custom_exception_1 = require("../lib/exceptions/custom-exception");
const auth_services_1 = require("../services/auth-services");
const response_handler_1 = require("../lib/response-handler");
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const loginData = await (0, auth_services_1.login)(email, password);
        response_handler_1.ResponseHandler.auth(res, loginData, "User logged in successfully");
    }
    catch (error) {
        if (error instanceof custom_exception_1.CustomException) {
            next(error);
        }
        next(new custom_exception_1.CustomException(500, "Internal Server Error"));
    }
};
exports.loginUser = loginUser;
const generateNewAccessToken = async (req, res, next) => {
    try {
        const result = await (0, auth_services_1.newAccessToken)(req?.user?.userId);
        if (result) {
            response_handler_1.ResponseHandler.auth(res, result, "New access token generated successfully");
        }
    }
    catch (error) {
        if (error instanceof custom_exception_1.CustomException) {
            next(error);
        }
        next(new custom_exception_1.CustomException(500, "Internal Server Error"));
    }
};
exports.generateNewAccessToken = generateNewAccessToken;
const logoutUser = async (req, res, next) => {
    try {
        response_handler_1.ResponseHandler.logout(res, "User logged out successfully");
    }
    catch (error) {
        if (error instanceof custom_exception_1.CustomException) {
            next(error);
        }
        next(new custom_exception_1.CustomException(500, "Internal Server Error"));
    }
};
exports.logoutUser = logoutUser;
