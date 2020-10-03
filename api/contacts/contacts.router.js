const { Router } = require('express');
const {
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
  getContactById
} = require('./contacts.controller');
const { verifyTokenMdlw } = require('../auth/auth.checkToken')

const contactsRouter = Router();

// @GET /api/contacts
contactsRouter.get('/', verifyTokenMdlw, getContactsController)

// @GET /api/contacts/:contactId
contactsRouter.get('/:contactId', getContactById)

// @POST /api/contacts
contactsRouter.post('/', verifyTokenMdlw, createContactController)

// @DELETE /api/contacts/:contactId
contactsRouter.delete('/:contactId', verifyTokenMdlw, deleteContactController)

// @PATCH /api/contacts/:contactId
contactsRouter.patch('/:contactId', verifyTokenMdlw, updateContactController)

module.exports = contactsRouter;