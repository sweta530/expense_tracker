import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/config/dbConnection.js";
import routes from "./src/routes/index.js";
import { initializeTables } from "./src/models/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL Database");
});

app.use(express.json());
app.use(cors());

// Test Route
app.get("/api/v1", (req, res) => {
  res.send("Expense Tracker API is running...");
});

// Routes
app.use("/api/v1", routes);

// Initialize database tables
initializeTables();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
