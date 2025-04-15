import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

export const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true
    },
    verified: { type: Boolean, default: false },
    strategy: {
      type: String,
      default: "local",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
  )

  userSchema.plugin(normalize);
export const UserModel = model ('User', userSchema);