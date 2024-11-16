// Import express
import express from "express";
const app = express();

import connectDB from "./config/db.js";
import homeRouter from "./routes/homeRouter.js";

// Define a port
const PORT = 3000;

// Define a route
app.use("/", homeRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
