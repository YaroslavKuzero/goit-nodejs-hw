const ContactsDB = require('./contacts.model');

const getContactsController = async (req, res) => {
  try {
    const contacts = await ContactsDB.getContacts();
    res.status(200).json(contacts)
  } catch (error) {
    console.error(error);
  }
}

const createContactController = async (req, res) => {
  try {
    const { body } = req;
    const newContact = await ContactsDB.createContact(body);
    res.status(201).json(newContact)
  } catch (error) {
    console.error(error);
  }
}

const updateContactController = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      response.status(400).send({ "message": "missing fields" })
      return;
    }
    const id = req.params.contactId;
    const { body } = req;
    const updatedContact = await ContactsDB.updateContact(id, body);
    res.status(200).json(updatedContact)
  } catch (error) {
    console.error(error);
  }
}

const deleteContactController = async (req, res) => {
  try {
    const id = req.params.contactId;
    await ContactsDB.deleteContact(id)
    res.status(200).end();
  } catch (error) {
    console.error(error);
  }
}

const getContactById = async (req, res) => {
  try {
    const id = req.params.contactId;
    const findedContact = await ContactsDB.getContactById(id)
    res.status(200).send(findedContact);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
  getContactById
}