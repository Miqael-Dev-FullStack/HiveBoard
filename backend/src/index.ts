import { PORT } from "./config/config";
import { connectDB } from "./config/db";
import app from "./app";

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
