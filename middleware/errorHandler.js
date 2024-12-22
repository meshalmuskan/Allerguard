module.exports = (err, req, res, next) => {
    console.error(err.message); // Log the error
    res.status(err.status || 500).json({ error: err.message || 'An unknown error occurred.' });
};