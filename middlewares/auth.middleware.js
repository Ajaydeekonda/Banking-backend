const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    // Check if token is provided and follows the "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided or invalid format.' });
    }

    // Extract token from the "Bearer <token>" format
    const token = authHeader.split(' ')[1];

    try {
        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;  // Attach user information from the token to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });  // Return 401 if token is invalid
    }
};

module.exports = authMiddleware;
