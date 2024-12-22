const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    const payload = { id: user.id, email: user.email };
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' }; // Token valid for 1 hour
    return jwt.sign(payload, secretKey, options);
};
module.exports = { generateToken };
