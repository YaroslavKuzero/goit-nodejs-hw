const jwt = require('jsonwebtoken');
const KEY = "kayofmcvxperin5dl9qpwb";

const createToken = async (payload) => {
  const token = await jwt.sign(payload, KEY);
  return `Bearer ${token}`
}

const checkToken = async (token) => {
  const normalizedToken = token.replace('Bearer ', '');
  try {
    const result = await jwt.verify(normalizedToken, KEY);
    return result
  } catch (error) {
    return ("Not authorized")
  }
}

module.exports = {
  createToken,
  checkToken,
}