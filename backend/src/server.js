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
const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://mern-test-project-ojk5.onrender.com/"
    : "http://localhost:5173";

app.use(express.json()); // Middleware to parse JSON bodies
app.use(
  cors({
    origin: FRONTEND_URL,
  })
); // Enable CORS for all routes

app.use(rateLimiter); // Rate limiting middleware
app.use("/api/posts", postRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath)); //serve the frontend as a static file
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
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
