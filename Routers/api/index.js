import express from "express";
import filesRouter from "./File.js";
import foldersRouter from "./Folder.js";
import authRouter from "./Auth.js";
// import activityRouter from "./Activity.js";
// import shareRouter from "./Share.js";
import userRouter from "./User.js";

const router = express.Router();

router.use("/files", filesRouter);
router.use("/folders", foldersRouter);
router.use("/auth", authRouter);
// router.use("/activities", activityRouter);
// router.use("/shares", shareRouter);
router.use("/users", userRouter);

export default router;
