const mongoose = require("mongoose");
const authMiddleware = require("../../middleware/authMiddleware");
require("dotenv").config();

// Import User model
const User = require("../../models/User");

// MongoDB Connection
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  
  try {
    const client = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    cachedDb = client;
    return client;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = async (req, res) => {
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    // Extract token from request headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token and get user data
    const userData = await authMiddleware(token);
    if (!userData) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    const user = await User.findById(userData.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
