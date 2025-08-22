"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.VerifyUserAccount = exports.createNewUser = void 0;
const custom_exception_1 = require("../lib/exceptions/custom-exception");
const user_services_1 = require("../services/user-services");
const response_handler_1 = require("../lib/response-handler");
/**
 * @function createNewUser
 * @description Create a new user
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const createNewUser = async (req, res, next) => {
    try {
        // extract user data from request body
        const { firstName, lastName, email, password } = req.body;
        // create a new user and send back a reponse to the client
        const createdUser = await (0, user_services_1.createUser)({
            firstName,
            lastName,
            email,
            password,
        });
        response_handler_1.ResponseHandler.created(res, 201, createdUser, "user created successfully");
    }
    catch (error) {
        if (error instanceof custom_exception_1.CustomException) {
            return next(error);
        }
        next(new custom_exception_1.CustomException(500, "Internal server error"));
    }
};
exports.createNewUser = createNewUser;
const VerifyUserAccount = async (req, res, next) => {
    try {
        const { otp } = req.body;
        const verifiedUser = await (0, user_services_1.verifyAccount)(otp);
        response_handler_1.ResponseHandler.ok(res, 200, verifiedUser, "user account verified successfully");
    }
    catch (error) {
        if (error instanceof custom_exception_1.CustomException) {
            return next(error);
        }
        next(new custom_exception_1.CustomException(500, "Internal server error"));
    }
};
exports.VerifyUserAccount = VerifyUserAccount;
const getCurrentUser = async (req, res, next) => {
    try {
        const currentUser = await (0, user_services_1.checkIfUserExistById)(req.user?.userId);
        if (!currentUser) {
            throw new custom_exception_1.CustomException(404, "User not found");
        }
        response_handler_1.ResponseHandler.ok(res, 200, currentUser, "Current user retrieved successfully");
    }
    catch (error) {
        if (error instanceof custom_exception_1.CustomException) {
            return next(error);
        }
        next(new custom_exception_1.CustomException(500, "Internal server error"));
    }
};
exports.getCurrentUser = getCurrentUser;
