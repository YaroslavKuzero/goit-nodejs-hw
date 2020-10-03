const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Anonim"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    type: String,
    default: "free"
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: ""
  }
})

class Contact {
  constructor() {
    this.db = mongoose.model('Contacts', contactSchema.plugin(mongoosePaginate))
  }

  getContacts = async (query) => {
    const { page, limit, sub } = query;
    if (sub) {
      return await this.db.find({ subscription: sub })
    }
    let options = {
      pagination: false
    }
    if (limit) {
      options = {
        page,
        limit,
      }
    }
    return await this.db.paginate({}, options).then(result => result.docs);
  }

  createContact = async (data) => {
    return await this.db.create(data);
  }

  updateContact = async (contactId, data) => {
    return await this.db.findByIdAndUpdate(contactId, data, {
      new: true,
      runValidators: true
    });
  }

  deleteContact = async (contactId) => {
    return await this.db.findByIdAndDelete(contactId);
  }

  getContactById = async (contactId) => {
    return await this.db.findById(contactId);
  }
};

module.exports = new Contact();