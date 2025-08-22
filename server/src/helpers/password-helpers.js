"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
const hashPassword = async (password) => {
    const salt = (0, crypto_1.randomBytes)(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64));
    return `${buf.toString("hex")}.${salt}`;
};
exports.hashPassword = hashPassword;
const comparePassword = async (plainTextPassword, userHashedPassword) => {
    const [hashedPassword, salt] = userHashedPassword.split(".");
    const buf = (await scryptAsync(plainTextPassword, salt, 64));
    return buf.toString("hex") === hashedPassword;
};
exports.comparePassword = comparePassword;
