const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const createToken = async (payload) => {
  const token = await jwt.sign(payload, KEY);
  return `Bearer ${token}`
}

const checkToken = async (token) => {
  const normalizedToken = token.replace('Bearer ', '');
  try {
    const result = await jwt.verify(normalizedToken, JWT_SECRET_KEY);
    return result
  } catch (error) {
    return ("Not authorized")
  }
}

module.exports = {
  createToken,
  checkToken,
}