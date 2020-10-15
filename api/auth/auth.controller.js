const bcrypt = require('bcrypt');
const User = require('../users/users.model');
const { v4: uuidv4 } = require('uuid');
const { createToken } = require('../../services/jwt.service');
const { avatarGenerator } = require('../../services/avatarGenerator.service');
const { createAvaURL, config } = require('../../services/config');
const { sendEmail } = require('../../services/email.service')
const fs = require('fs-extra');

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
    const verificationToken = uuidv4();
    const cryptedPassword = await bcrypt.hash(body.password, SALT);
    const newUser = await User.createUser({
      ...body,
      password: cryptedPassword,
      verificationToken,
    });
    sendEmail(newUser.email, verificationToken);
    const newAvatar = await avatarGenerator(newUser.id);
    await fs.move(newAvatar, `${config.staticURL}/avatar-${newUser.id}.png`);
    const avatarURL = await createAvaURL(newUser.id);
    await User.updateUser(newUser.id, { avatarURL });
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
    const user = req.user
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

const verifyTokenController = async (req, res) => {
  try {
    const { verificationToken } = req.params
    console.log(verificationToken);
    const user = await User.findUser({ verificationToken: verificationToken })
    if (!user) {
      res.status(400).send('User not found');
      return
    }
    await User.updateUser(user.id, { verificationToken: '' })
    res.status(200).end();
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  registerController,
  loginController,
  logoutController,
  verifyTokenController
}