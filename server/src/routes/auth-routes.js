"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth-controllers");
const auth_guard_1 = require("../middlewares/auth-guard");
const authRoutes = express_1.default.Router();
authRoutes.post("/login", auth_controllers_1.loginUser);
authRoutes.get("/new-access-token", auth_guard_1.authGuard2, auth_controllers_1.generateNewAccessToken);
authRoutes.post("/logout", auth_guard_1.authGuard, auth_controllers_1.logoutUser);
exports.default = authRoutes;
