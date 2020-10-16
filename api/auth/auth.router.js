const { Router } = require('express');
const {
  registerController,
  loginController,
  logoutController,
  verifyTokenController
} = require('./auth.controller');
const { verifyTokenMdlw } = require('./auth.checkToken');
const validationMiddleware = require('./auth.validation');

const authRouter = Router();

// ##POST  /auth/register
authRouter.post('/register', validationMiddleware, registerController);

// ##POST /auth/login
authRouter.post('/login', validationMiddleware, loginController);

// ##POST /auth/logout
authRouter.post('/logout', verifyTokenMdlw, logoutController);

//##GET /auth/verify/:verificationToken
authRouter.get('/verify/:verificationToken', verifyTokenController)

module.exports = authRouter;