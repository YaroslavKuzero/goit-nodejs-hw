const Contacts = require('./contacts');
const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      Contacts.listContacts().then(data => console.log(data));
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

invokeAction(argv);