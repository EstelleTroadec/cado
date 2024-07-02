import express from "express";
import controller from "../controllers/userController.js";

const router = express.Router();

router.get("/users", controller.getUsers);
router.post("/users", controller.createUser);

export default router;
