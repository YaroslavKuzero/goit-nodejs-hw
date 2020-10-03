const { checkToken } = require('../../services/jwt.service');
const User = require('../users/users.model');

const verifyTokenMdlw = async (req, res, next) => {
  try {
    const headerToken = req.get('Authorization')
    if (!headerToken) {
      return res.status(401).send('pls add token to your request')
    }
    const result = await checkToken(headerToken);
    if (result === "Not authorized") {
      res.status(401).send({
        "message": "Not authorized"
      })
    }
    const user = await User.getUserById(result.id);
    if (!user) {
      res.status(401).send({
        "message": "Not authorized"
      })
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);;
  }
}

module.exports = { verifyTokenMdlw };