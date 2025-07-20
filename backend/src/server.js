import express from "express";
import postRoutes from "./routes/postRoutes.js";
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/mongodb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use("/api/posts", postRoutes);

connectToMongoDB();

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

app.get("/", (req, res) => {
  res.status(200).send("Home route");
});
