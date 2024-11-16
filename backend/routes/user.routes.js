import { Router } from "express";
import { createUser , loginUser , logout } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", createUser)

router.post("/login", loginUser)

router.get("/logout", logout)

export default router