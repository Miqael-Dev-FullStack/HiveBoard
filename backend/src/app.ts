import express from "express";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import { authMiddleware } from "middleware/authMiddleware";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", userRoutes);

app.get("/me", authMiddleware, async (req, res) => {
  res.status(200).json({
    id: req.user?.id,
    name: req.user?.name,
    email: req.user?.email,
  });
});

app.get("/dashboard", authMiddleware, (req, res) => {
  res.send(`Hello ${req.user?.name}`);
});

export default app;
