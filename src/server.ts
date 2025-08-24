import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config(); 

const PORT = process.env.PORT;
console.log(process.env.MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
