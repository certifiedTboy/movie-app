import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
