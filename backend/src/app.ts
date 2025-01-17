import express from "express";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import { authMiddleware } from "middleware/authMiddleware";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", userRoutes);

app.get("/dashboard", authMiddleware, (req, res) => {
  res.send(`Hello ${req.user?.name}`);
});

export default app;
