import express from "express";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import { authMiddleware } from "middleware/authMiddleware";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Public Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// User Routes
app.use("/", userRoutes);

// Protected Routes
app.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    id: req.user?.id,
    name: req.user?.name,
    email: req.user?.email,
    picture: req.user?.picture,
  });
});

app.get("/dashboard", authMiddleware, (req, res) => {
  res.send(`Hello, ${req.user?.name}! Welcome to your dashboard.`);
});

export default app;
