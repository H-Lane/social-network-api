const { ObjectId } = require(`mongoose`).Types;
const { User, Thought } = require(`../models`);

module.exports = {
  //GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
