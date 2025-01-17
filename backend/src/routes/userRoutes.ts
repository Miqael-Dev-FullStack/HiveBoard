import app from "../app";
import { Router } from "express";
import { login, logout, signup } from "controllers/authContollers";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

export default router;
