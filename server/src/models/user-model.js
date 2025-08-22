"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: [true, "Firstname is required"] },
    lastName: { type: String, required: [true, "Lastname is required"] },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "This email is already taken by another user"],
        match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    verificationToken: { type: String },
    verificationTokenExpiresIn: { type: Date },
    isVerified: { type: Boolean, default: false },
    password: { type: String },
    passwordResetToken: { type: String },
    passwordResetTokenExpiresIn: { type: Date },
}, { timestamps: true });
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
