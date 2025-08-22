"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard2 = exports.authGuard = void 0;
const custom_exception_1 = require("../lib/exceptions/custom-exception");
const auth_helpers_1 = require("../helpers/auth-helpers");
const authGuard = (req, res, next) => {
    try {
        const accessToken = req.cookies["access_token"];
        if (!accessToken) {
            throw new custom_exception_1.CustomException(403, "Access token is required");
        }
        const payload = (0, auth_helpers_1.verifyAccessToken)(accessToken);
        if (!payload || typeof payload === "string") {
            throw new custom_exception_1.CustomException(401, "jwt expired");
        }
        req.user = {
            userId: payload.userId,
            email: payload.email,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authGuard = authGuard;
const authGuard2 = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            throw new custom_exception_1.CustomException(403, "Authorization token is required");
        }
        if (token?.split(" ")[0] !== "Bearer") {
            throw new custom_exception_1.CustomException(403, "invalid token");
        }
        const refreshToken = token.split(" ")[1];
        const payload = (0, auth_helpers_1.verifyRefreshToken)(refreshToken);
        req.user = {
            userId: payload.userId,
            email: payload.email,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authGuard2 = authGuard2;
