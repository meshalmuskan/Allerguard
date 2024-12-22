const jwt = require('jsonwebtoken');
// Authentication Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; // Expecting Bearer token format
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const secretKey = process.env.JWT_SECRET;
    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = decoded; // Attach the decoded token payload (e.g., user info) to the request
        next();
    });
};
module.exports = authMiddleware;
