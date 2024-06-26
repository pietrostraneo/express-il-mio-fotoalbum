const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { hashPassword, readPass } = require('../utils/pass.js');
const tknGenerator = require('../utils/jwt.js');

/**
 * Register a new user
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 *
 * @example
 * {
 *   "username": "johnDoe",
 *   "email": "johndoe@example.com",
 *   "password": "mysecretpassword"
 * }
 *
 * @returns {Object} - JSON response with token and user data
 */

const register = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const data = {
            username,
            email,
            password: await hashPassword(password),
        }

        if (req.file) {
            data.image = req.file.filename;
        }

        const newUser = await prisma.user.create({ data })
        const token = tknGenerator({
            username: newUser.username,
            email: newUser.email
        });

        res.json({ token, data: newUser });

    } catch (err) {
        console.error(err);
    }
}

/**
 * Login an existing user
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 *
 * @example
 * {
 *   "email": "johndoe@example.com",
 *   "password": "mysecretpassword"
 * }
 *
 * @returns {Object} - JSON response with token and user data
 */

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isValid = await readPass(password, user.password)
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = tknGenerator({
            username: user.username,
            email: user.email
        });
        res.json({ token, data: user });
    } catch (err) {
        console.error(err);
    }

}

module.exports = {
    register,
    login
}