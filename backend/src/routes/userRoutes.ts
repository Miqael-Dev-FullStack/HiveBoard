import app from "../app";
import { Router } from "express";
import { createUser, getUser } from "../controllers/userControllers";

const router = Router();

router.get("/", getUser);
router.post("/", createUser);

export default router;
