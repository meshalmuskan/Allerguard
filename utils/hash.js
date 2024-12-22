const bcrypt = require('bcrypt');
// Hash a password
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
// Compare a plaintext password with a hashed password
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
module.exports = { hashPassword, comparePassword };