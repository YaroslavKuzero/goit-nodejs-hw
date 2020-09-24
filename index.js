const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const {
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
  getContactById
} = require('./contacts.controller');

const PORT = 3000;
const DB_URI = 'mongodb+srv://admin:admin@cluster0.drfzo.mongodb.net/db-contacts?retryWrites=true&w=majority'

const runServer = async () => {
  //connection to db
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connection successful')
  } catch (error) {
    console.error(`connection error: ${error}`);
    process.exit();
  }

  //run express
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('combined'));

  // @GET /api/contacts
  app.get('/api/contacts', getContactsController)

  // @GET /api/contacts/:contactId
  app.get('/api/contacts/:contactId', getContactById)

  // @POST /api/contacts
  app.post('/api/contacts', createContactController)

  // @DELETE /api/contacts/:contactId
  app.delete('/api/contacts/:contactId', deleteContactController)

  // @PATCH /api/contacts/:contactId
  app.patch('/api/contacts/:contactId', updateContactController)

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  })
}

runServer();