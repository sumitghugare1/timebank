const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (token) => {
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Return user data
    return decoded;
  } catch (error) {
    return null;
  }
};
