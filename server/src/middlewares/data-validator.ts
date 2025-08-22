import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { CustomException } from "../lib/exceptions/custom-exception";

export const checkValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).array();

  if (errors.length > 0) {
    throw new CustomException(400, errors[0].msg);
  }

  next();
};

export const userDataValidators = [
  body("firstName")
    .notEmpty()
    .withMessage("first name is required")
    .isString()
    .withMessage("first name must be a string"),
  body("lastName")
    .notEmpty()
    .withMessage("last name is required")
    .isString()
    .withMessage("last name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    )
    .withMessage(
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character"
    ),
];

export const userVerificationValidator = [
  body("otp")
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
