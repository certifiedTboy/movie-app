import mongoose from "mongoose";
import envVariables from "../config";

const { DB_URI } = envVariables;

const connectDb = async () => {
  try {
    if (!DB_URI) {
      throw new Error("Database URI is not defined in environment variables.");
    }

    await mongoose.connect(DB_URI);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};

export default connectDb;
