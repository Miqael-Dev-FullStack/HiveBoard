import app from "../app";
import { Router } from "express";
import { googleLogin, login, logout, signup } from "controllers/authContollers";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
// router.post("/google", googleLogin);
router.post("/google", googleLogin);

export default router;
