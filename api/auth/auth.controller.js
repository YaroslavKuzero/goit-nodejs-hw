const bcrypt = require('bcrypt');
const User = require('../users/users.model');
const { createToken } = require('../../services/jwt.service');
const SALT = 6;

const registerController = async (req, res) => {
  try {
    const { body: { email } } = req;
    const { body } = req;
    const isUserExist = await User.findUser({ email });
    if (isUserExist) {
      return res.status(409).send({
        "message": "Email in use"
      })
    }
    const cryptedPassword = await bcrypt.hash(body.password, SALT);
    const newUser = await User.createUser({
      ...body,
      password: cryptedPassword,
    });
    res.status(201).send({
      "user": {
        "email": newUser.email,
        "subscription": newUser.subscription
      }
    });
  } catch (error) {
    console.error(error);
  }
}

const loginController = async (req, res) => {
  try {
    const { body: { email, password } } = req;
    const user = await User.findUser({ email });
    if (!user) {
      return res.status(401).send('Email or password is wrong')
    };
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send('Email or password is wrong')
    }
    const token = await createToken({ id: user._id });
    await User.updateUser(user._id, { token: token })
    res.status(200).send({
      "token": token,
      "user": {
        "email": user.email,
        "subscription": user.subscription
      }
    })
  } catch (error) {
    console.error(error);
  }
}

const logoutController = async (req, res) => {
  try {
    const { id } = req.user
    const user = await User.getUserById(id)
    if (!user) {
      res.status(401).send({
        "message": "Not authorized"
      })
    }
    await User.updateUser(user._id, { token: '' })
    res.status(204).end()
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  registerController,
  loginController,
  logoutController
}