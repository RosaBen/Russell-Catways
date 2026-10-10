import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "username is required"],
    minlength: [3, 'username should have 3 character minimum'],
    maxlength: [15, 'username should have 15 character maximum']
  },
  email: {
    type: String,
    trim: true,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'invalid email']
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, 'password should have at least 6 characters'],
    required: [true, "password is required"]
  }
}, {
  timestamps: true
});

User.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
  ;
});

export default mongoose.model("User", User);
