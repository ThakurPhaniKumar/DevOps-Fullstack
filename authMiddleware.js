const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Look for token in header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        // Extract the actual token string after "Bearer "
        const token = authHeader.split(" ")[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user ID to the request object
        req.user = verified; 
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid or Expired Token" });
    }
};