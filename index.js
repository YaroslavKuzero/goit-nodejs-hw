const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Joi = require('joi');
const argv = require('yargs').argv;

const Contacts = require('./contacts');
const invokeAction = require('./actions');

const schemaAdd = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemaPatch = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// @GET /api/contacts
app.get('/api/contacts', async (request, response) => {
  res = await Contacts.listContacts();
  response.status(200).send(res);
})

// @GET /api/contacts /: contactId
app.get('/api/contacts/:contactId', async (request, response) => {
  const id = parseInt(request.params.contactId);
  const getContact = await Contacts.getContactById(id);
  if (getContact === 'Contact is not exist') {
    response.status(404).send({ "message": "Not found" })
    return;
  }
  response.status(200).send(getContact);
})

// @POST /api/contacts
app.post('/api/contacts', async (request, response) => {
  try {
    await schemaAdd.validateAsync(request.body);
  }
  catch (err) {
    response.status(400).send({ "message": "missing required name field" })
    return;
  }
  const { name, email, phone } = request.body
  const newContact = await Contacts.addContact(name, email, phone);
  response.status(201).send(newContact);
})

// ### @DELETE /api/contacts /: contactId
app.delete('/api/contacts/:contactId', async (request, response) => {
  const id = parseInt(request.params.contactId);
  const message = await Contacts.removeContact(id)
  if (message === { "message": "Not found" }) {
    response.status(404).send(message)
    return;
  }
  response.status(200).send(message);
})

// ### @PATCH /api/contacts /: contactId
app.patch('/api/contacts/:contactId', async (request, response) => {
  if (Object.keys(request.body).length === 0) {
    response.status(400).send({ "message": "missing fields" })
    return;
  }

  try {
    await schemaPatch.validateAsync(request.body);
  }
  catch (err) {
    response.status(400).send(err.details);
    return;
  }

  const id = parseInt(request.params.contactId);
  const message = await Contacts.updateContactById(id, request.body)
  if (message === { "message": "Not found" }) {
    response.status(404).send(message)
    return
  }
  response.status(200).send(message);
})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
})

// invokeAction(argv);