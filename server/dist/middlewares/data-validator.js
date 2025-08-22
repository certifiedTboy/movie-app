"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerificationValidator = exports.userDataValidators = exports.checkValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const custom_exception_1 = require("../lib/exceptions/custom-exception");
const checkValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).array();
    if (errors.length > 0) {
        throw new custom_exception_1.CustomException(400, errors[0].msg);
    }
    next();
};
exports.checkValidationErrors = checkValidationErrors;
exports.userDataValidators = [
    (0, express_validator_1.body)("firstName")
        .notEmpty()
        .withMessage("first name is required")
        .isString()
        .withMessage("first name must be a string"),
    (0, express_validator_1.body)("lastName")
        .notEmpty()
        .withMessage("last name is required")
        .isString()
        .withMessage("last name must be a string"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email address"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required")
        .isString()
        .withMessage("password must be a string")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)
        .withMessage("Password must be at least 8 characters long, include uppercase, lowercase, number, and special character"),
];
exports.userVerificationValidator = [
    (0, express_validator_1.body)("otp")
        .notEmpty()
        .withMessage("OTP is required")
        .isString()
        .withMessage("OTP must be a string")
        .isLength({ min: 6, max: 6 })
        .withMessage("OTP must be 6 characters long")
        .custom((value) => {
        if (!/^\d+$/.test(value)) {
            throw new Error("OTP must be a numeric string");
        }
        return true;
    }),
];
