const { Schema, model } = require(`mongoose`);

var validateEmail = function (email) {
  var regex = /^.+@(?:[\w-]+\.)+\w+$/;
  return regex.test(email);
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validateEmail, `Please enter a valid email address`],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: `thought`,
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: `user`,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual(`friendCount`).get(function () {
  return this.friends.length;
});

const User = model(`user`, userSchema);

module.exports = User;
