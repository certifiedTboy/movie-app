"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_exception_1 = require("../lib/exceptions/custom-exception");
const config_1 = __importDefault(require("../config"));
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN, } = config_1.default;
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "5d" });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        return payload;
    }
    catch (error) {
        throw new custom_exception_1.CustomException(401, "jwt expired");
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
        return payload;
    }
    catch (error) {
        throw new custom_exception_1.CustomException(401, "jwt expired");
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
