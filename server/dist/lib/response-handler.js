"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
class ResponseHandler {
    static created(res, statusCode, data, message) {
        return res.status(statusCode).json({ message, data, status: "success" });
    }
    static ok(res, statusCode, data, message) {
        return res.status(statusCode).json({ message, data, status: "success" });
    }
    static auth(res, data, message) {
        const cookieOptions = {
            expires: new Date(Date.now() + 60 * 60 * 1000),
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        };
        return res
            .cookie("access_token", data.accessToken, cookieOptions)
            .json({ message, data });
    }
    static logout(res, message) {
        return res.clearCookie("access_token").json({ message, status: "success" });
    }
}
exports.ResponseHandler = ResponseHandler;
