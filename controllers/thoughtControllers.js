const { ObjectId } = require(`mongoose`).Types;
const { User, Thought } = require(`../models`);

module.exports = {
  //GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //GET a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .populate("reactions");

      if (!thought) {
        res.status(404).json({ message: "No Thought found with that ID!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //POST a new thought and push to the users thought array
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);

      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $set: { thoughts: newThought._id } },
        { new: true }
      );

      res.json({ message: `Added thought ${newThought} to user ${user}` });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //PUT request to update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No Thought found with that ID!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //DELETE a single thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.deleteOne({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: "No Thought found with that ID!" });
      }

      res.json({ message: `Thought succesfully deleted` });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //POST a reaction to a single thought's reactions array
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      ).populate("reactions");

      if (!thought) {
        res.status(404).json({ message: "No Thought found with that ID!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //DELETE a thought
  async deleteThought(req, res) {
    try {
        const thought = 
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
