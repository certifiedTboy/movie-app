"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundException = void 0;
const notFoundException = (req, res, next) => {
    res.status(404).json({
        status: 404,
        message: `${req.originalUrl} endpoint does not exist on the api`,
        method: req.method,
        path: req.originalUrl,
        timestamp: new Date().toISOString(),
    });
};
exports.notFoundException = notFoundException;
