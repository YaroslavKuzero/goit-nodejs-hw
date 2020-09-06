const fs = require('fs').promises;
const path = require('path');

class Contacs {

  constructor() {
    this.contactsPath = path.resolve(__dirname, 'db', 'contacts.json')
  }

  listContacts = async () => {
    const contactList = await fs.readFile(this.contactsPath, 'utf8');
    return JSON.parse(contactList).map(item => item.name)
  }

  getContactById = async (contactId) => {
    const contacts = await fs.readFile(this.contactsPath, 'utf8');
    const findContact = JSON.parse(contacts).filter(item => item.id === contactId)
    if (findContact.length) {
      return findContact;
    }
    return 'Contact is not exist';
  }


  removeContact = async (contactId) => {
    const contacts = await fs.readFile(this.contactsPath, 'utf8');
    const newContacts = JSON.parse(contacts).filter(item => item.id !== contactId);
    const deletedContact = JSON.parse(contacts).find(item => item.id === contactId);
    await fs.writeFile(this.contactsPath, JSON.stringify(newContacts));

    return `The contact ${deletedContact.name} has been successfully removed!`
  }

  addContact = async (name, email, phone) => {
    const contacts = await fs.readFile(this.contactsPath, 'utf8');
    const contactsList = JSON.parse(contacts);
    const id = contactsList.length ? [...contactsList].pop().id + 1 : 1;
    const newContact = {
      id,
      name,
      email,
      phone
    };
    contactsList.push(newContact);

    fs.writeFile(this.contactsPath, JSON.stringify(contactsList))
    return `The contact ${name} has been successfully saved!`;
  }
}

module.exports = new Contacs();