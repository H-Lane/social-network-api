const { Schema, model } = require(`mongoose`);
const reactionSchema = require(`./Reaction`);

const formatDate = function (date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1],
      maxLength: [280],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

//thoughtSchema.virtual(`reactionCount`).get(() => this.reactions.length);

const Thought = model(`thought`, thoughtSchema);

module.exports = Thought;
