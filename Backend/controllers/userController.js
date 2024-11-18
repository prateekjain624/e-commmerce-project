import User from "../Schemas/userSchema.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, mobile, address, pincode } =
    req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new User({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      mobile: mobile,
      address: address,
      pincode: pincode,
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("There is some server error, please try in some other time");
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "codingninja",
      { expiresIn: "1h" }
    );
    user.token = token;
    await user.save();

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "login successfull" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("There is some server error, please try in some other time");
  }
};
