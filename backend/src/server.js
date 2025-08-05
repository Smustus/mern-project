import express from "express";
import postRoutes from "./routes/postRoutes.js";
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/mongodb.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON bodies
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173", // frontend URL
    })
  ); // Enable CORS for all routes
}

app.use(rateLimiter); // Rate limiting middleware
app.use("/api/posts", postRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); //serve the frontend as a static file
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

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
