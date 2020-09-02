const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) throw err;
    const list = JSON.parse(data).map(item => item.name)
    console.log(list);
  })
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) throw err;
    const findContact = JSON.parse(data).filter(item => item.id === contactId)
    if (findContact.length) {
      console.log(findContact);
      return;
    }
    console.log('Contact is not exist')
  })
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data).filter(item => item.id !== contactId)
    const deletedContact = JSON.parse(data).find(item => item.id === contactId)

    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw err;
      console.log(`The contact ${deletedContact.name} has been successfully removed!`);
    });
  })
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data)
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone
    };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw err;
      console.log(`The contact ${name} has been successfully saved!`);
    });
  })
}

module.exports.API = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}