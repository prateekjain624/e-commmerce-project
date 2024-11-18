// Import express
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/index.js";

// Define a port
const PORT = 3000;

// this middleware used to parse the body
app.use(express.json());
app.use(cookieParser());

// Define a route
app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
