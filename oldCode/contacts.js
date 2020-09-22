const fs = require('fs').promises;
const path = require('path');

class Contacts {

  constructor() {
    this.contactsPath = path.resolve(__dirname, 'db', 'contacts.json')
  }

  listContacts = async () => {
    const contactList = await fs.readFile(this.contactsPath, 'utf8');
    return JSON.parse(contactList)
  }

  getContactById = async (contactId) => {
    const contacts = await this.listContacts();
    const findContact = contacts.find(item => item.id === contactId)
    if (findContact) {
      return findContact;
    }
    return 'Contact is not exist';
  }

  updateContactById = async (contactId, updateData) => {
    const contactById = await this.getContactById(contactId);
    if (contactById === 'Contact is not exist') {
      return ({ "message": "Not found" })
    }

    const contacts = await this.listContacts();
    let updatedContact;
    const newContacts = contacts.map(item => {
      if (item.id === contactId) {
        item = { ...item, ...updateData }
        updatedContact = item;
      }
      return item
    })
    // const findContact = contacts.find(item => item.id === contactId)
    // const idx = contacts.indexOf(findContact);
    // const updatedContact = { ...findContact, ...updateData };
    // await contacts.splice(idx, 1, updatedContact);

    await fs.writeFile(this.contactsPath, JSON.stringify(newContacts));

    return updatedContact;
  }


  removeContact = async (contactId) => {
    const contacts = await this.listContacts();
    const deletedContact = contacts.find(item => item.id === contactId);
    if (deletedContact === undefined) {
      return ({ "message": "Not found" })
    }
    const newContacts = contacts.filter(item => item.id !== contactId);

    await fs.writeFile(this.contactsPath, JSON.stringify(newContacts));

    return ({ "message": "contact deleted" })
  }

  addContact = async (name, email, phone) => {
    const contacts = await this.listContacts();

    //Checking for duplicates
    const toArrayValues = contacts.map(item => Object.values(item));
    let isNotDuplicate = null;
    toArrayValues.forEach(item => {
      if (item.includes(name)) {
        isNotDuplicate = `name ${name}`;
        return;
      }
      if (item.includes(email)) {
        isNotDuplicate = `email ${email}`;
        return;
      }
      if (item.includes(phone)) {
        isNotDuplicate = `phone ${phone}`;
        return;
      }
      isNotDuplicate = null
    })
    if (isNotDuplicate !== null) {
      return `User with ${isNotDuplicate} already exist!`
    }

    //Adding new contact
    const id = contacts.length ? [...contacts].pop().id + 1 : 1;
    const newContact = {
      id,
      name,
      email,
      phone
    };
    contacts.push(newContact);

    await fs.writeFile(this.contactsPath, JSON.stringify(contacts))
    return newContact;
  }
}

module.exports = new Contacts();