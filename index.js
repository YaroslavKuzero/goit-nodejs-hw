const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsRouter = require('./api/contacts/contacts.router');
const authRouter = require('./api/auth/auth.router');
const usersRouter = require('./api/users/users.router');

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

  //Routes
  app.use('/api/contacts', contactsRouter);
  app.use('/auth', authRouter);
  app.use('/users', usersRouter);

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  })
}

runServer();