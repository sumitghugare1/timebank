const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import route files
const authRoutes = require("../routes/authRoutes");
const skillRoutes = require("../routes/skillRoutes");
const transactionRoutes = require("../routes/transactionRoutes");
const courseRoutes = require("../routes/courseRoutes");
const adminRoutes = require("../routes/adminRoutes");

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-domain.vercel.app', 'https://your-custom-domain.com'] 
    : 'http://localhost:3000'
}));

// MongoDB Connection - Optimized for serverless
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  
  try {
    const client = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });
    
    cachedDb = client;
    console.log("MongoDB Connected");
    return client;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to the database before handling requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Export the Express API
module.exports = app;
