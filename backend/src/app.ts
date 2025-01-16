import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);

export default app;
