import express from "express";
import controller from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import userController from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", authMiddleware, userController.getMe);


export default router;
