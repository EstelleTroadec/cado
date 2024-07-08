import express from "express";
import controller from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/register", controller.register);
router.post("/auth/login", controller.login);


export default router;
