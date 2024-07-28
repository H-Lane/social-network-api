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
  //GET a single User
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        res.status(404).json({ message: "No User found with that ID!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //POST a new user in the system
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);

      res.json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //PUT any updates to an individual user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No User found with that ID!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //DELETE a single User
  async deleteUser(req, res) {
    try {
      const user = await User.deleteOne({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: "No User found with that ID!" });
      }

      const thoughts = await Thought.deleteMany({ _id: req.params.userId });

      res.json({
        message: `User successfully deleted along with ${thoughts.deletedCount} thoughts`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //POST a new friend to friends array
  async createFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      ).populate(`friends`);

      if (!user) {
        res.status(404).json({ message: "No User found with that ID!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //DELETE a current friend from friends array
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No User found with that ID!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
