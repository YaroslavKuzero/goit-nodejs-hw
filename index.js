const { API } = require('./contacts');
const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      API.listContacts()
      break;

    case 'get':
      API.getContactById(id)
      break;

    case 'add':
      API.addContact(name, email, phone)
      break;

    case 'remove':
      API.removeContact(id)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);