import express from "express";
import postRoutes from "./routes/postRoutes.js";
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/mongodb.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter); // Rate limiting middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
  })
); // Enable CORS for all routes
app.use("/api/posts", postRoutes);

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

app.get("/", (req, res) => {
  res.status(200).send("Home route");
});
