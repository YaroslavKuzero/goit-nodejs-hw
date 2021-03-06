const Contacts = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      Contacts.listContacts().then(data => console.table(data));
      break;

    case 'get':
      Contacts.getContactById(id).then(data => console.log(data));
      break;

    case 'add':
      Contacts.addContact(name, email, phone).then(data => console.log(data));
      break;

    case 'remove':
      Contacts.removeContact(id).then(data => console.log(data));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

module.exports = invokeAction;