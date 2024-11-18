import jwt from "jsonwebtoken";
import User from "../Schemas/userSchema.js";

const authenticationToken = async (req, res, next) => {
  try {
    // retrieve the token from cookies
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Please login to access this route" });

    // verify the token
    const decoded = jwt.verify(token, "codingninja");
    console.log(decoded);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // check the token from database and add the user data in req objects
    if (user.token == token) {
      req.user = user;
      next();
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticationToken;
