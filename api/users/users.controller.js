const User = require('./users.model');

const getCurrentUserController = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.getUserById(_id)
    if (!user) {
      res.status(401).send({
        "message": "Not authorized"
      })
    }
    res.status(200).send({
      "email": user.email,
      "subscription": user.subscription
    })
  } catch (error) {
    console.error(error);
  }
}

const updateSubscriptionController = async (req, res) => {
  try {
    const { subscription } = req.body
    const user = req.user;
    if (!user) {
      res.status(401).send({
        "message": "Not authorized"
      })
    }
    await User.updateUser(user._id, { subscription })
    res.status(200).send({
      "email": user.email,
      "subscription": subscription
    })
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  getCurrentUserController,
  updateSubscriptionController
}