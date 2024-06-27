/**
 * Generates a JSON Web Token (JWT) from a given payload.
 *
 * @param {Object} payload - The payload to be encoded in the JWT.
 * @param {string} [expiresIn='8h'] - The time until the token expires. Can be a string in the format of 'Xm' (minutes), 'Xh' (hours), or 'Xd' (days).
 * @returns {string} The generated JWT.
 *
 * @example
 * const token = generateToken({ userId: 1, username: 'johnDoe' });
 * console.log(token); // Output: a JSON Web Token string
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (payload, expiresIn = '8h') => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });