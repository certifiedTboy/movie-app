"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const { DB_URI } = config_1.default;
const connectDb = async () => {
    try {
        if (!DB_URI) {
            throw new Error("Database URI is not defined in environment variables.");
        }
        await mongoose_1.default.connect(DB_URI);
        console.log("Connected to the database successfully.");
    }
    catch (error) {
        console.log("Error connecting to the database:", error);
    }
};
exports.default = connectDb;
