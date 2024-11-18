import express from "express";
import { homeController } from "../controllers/homeController.js";
import userRouter from "./users.js";
const router = express.Router();
import authenticationToken from "../middlewares/authentication.js";

router.get("/", authenticationToken, homeController);

router.use("/users", userRouter);

export default router;
