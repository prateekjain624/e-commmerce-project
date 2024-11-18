import { mongoose } from "mongoose";

import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number, required: true },
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
  token: { type: String },
});

// this pre function is saving the password to the schema
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    // generating the salt
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(this.password, saltRounds);

    this.password = hashedPassword;

    next();
  } catch (err) {
    next(err);
  }
});

// method to compare the password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err);
  }
};
const User = mongoose.model("User", userSchema);
export default User;
