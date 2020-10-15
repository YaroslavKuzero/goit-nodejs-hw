const { Router } = require('express');
const { verifyTokenMdlw } = require('../auth/auth.checkToken');
const { getCurrentUserController, updateSubscriptionController, uploadAvatarController } = require('./users.controller');
const { avatarUploaderMdw } = require('../../middlewares/avatarUploaderMdw')

const usersRouter = Router();

// ##GET /users/current
usersRouter.get('/current', verifyTokenMdlw, getCurrentUserController)

// ##PATCH /users
usersRouter.patch('/', verifyTokenMdlw, updateSubscriptionController)

//##PATCH /users/avatars
usersRouter.patch('/avatars', verifyTokenMdlw, avatarUploaderMdw, uploadAvatarController)

module.exports = usersRouter;