"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const global_error_handler_1 = require("./lib/exceptions/global-error-handler");
const not_found_exception_1 = require("./lib/exceptions/not-found-exception");
const apiV1Routes_1 = __importDefault(require("./routes/apiV1Routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", apiV1Routes_1.default);
app.get("/api/v1", (req, res) => {
    res.json({ message: "server is live..." });
});
app.use(global_error_handler_1.globalErrorHandler);
app.use(not_found_exception_1.notFoundException);
exports.default = app;
