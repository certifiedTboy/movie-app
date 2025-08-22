"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user-controllers");
const data_validator_1 = require("../middlewares/data-validator");
const auth_guard_1 = require("../middlewares/auth-guard");
const userRoutes = express_1.default.Router();
userRoutes.post("/", data_validator_1.userDataValidators, data_validator_1.checkValidationErrors, user_controllers_1.createNewUser);
userRoutes.put("/verify", data_validator_1.userVerificationValidator, data_validator_1.checkValidationErrors, user_controllers_1.VerifyUserAccount);
userRoutes.get("/me", auth_guard_1.authGuard, user_controllers_1.getCurrentUser);
exports.default = userRoutes;
