const mongoose = require('mongoose');
const { config } = require('../../services/config');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
      default: config.defaultAvatarImg
    },
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free"
    },
    token: {
      type: String,
      default: ''
    },
    verificationToken: {
      type: String,
      default: ''
    }
  }
)

class User {
  constructor() {
    this.db = mongoose.model('Users', userSchema);
  }

  getUsers = async () => {
    return await this.db.find();
  }

  createUser = async (data) => {
    return await this.db.create(data);
  }

  updateUser = async (userId, data) => {
    return await this.db.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true
    });
  }

  deleteUser = async (userId) => {
    return await this.db.findByIdAndDelete(userId);
  }

  getUserById = async (userId) => {
    return await this.db.findById(userId);
  }

  findUser = async (data) => {
    return await this.db.findOne(data)
  }
}

module.exports = new User;
