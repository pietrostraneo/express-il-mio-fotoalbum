const bcrypt = require('bcrypt');

// Function that takes the password as an input parameter and returns a hashed password
async function hashPassword(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password + process.env.HASH_KEY, saltRounds);
    return hash;
}

// Function that checks the correspondence between the password and the hashed password
async function readPass(password, hashedPass) {
    const isValid = await bcrypt.compare(password + process.env.HASH_KEY, hashedPass)
    return isValid;
}

module.exports = {
    hashPassword,
    readPass
}