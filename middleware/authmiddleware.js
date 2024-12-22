// middleware/auth.js
const auth_Middleware = (req, res, next) => {
    if (req.session && req.session.userId) {
        // User is logged in, proceed to the next middleware
        return next();
    }
    // User is not logged in, redirect to login
    res.redirect('/login');
};

module.exports = auth_Middleware;
