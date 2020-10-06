const { Router } = require('express');
const { verifyTokenMdlw } = require('../auth/auth.checkToken');
const { getCurrentUserController, updateSubscriptionController } = require('./users.controller');

const usersRouter = Router();

// ##GET /users/current
usersRouter.get('/current', verifyTokenMdlw, getCurrentUserController)

// ##PATCH /users
usersRouter.patch('/', verifyTokenMdlw, updateSubscriptionController)
module.exports = usersRouter;