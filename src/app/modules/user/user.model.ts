import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

export const User = model("User", userSchema);
