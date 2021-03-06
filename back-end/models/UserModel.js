const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true,
};

const userSchema = new Schema(
  {
    email: {
      ...reqString,
      validate: {
        validator: async value => {
          const alreadyExist = await mongoose.models.user.countDocuments({
            email: value,
          });
          const formatted = /^[a-zA-z0-9]{1,}@(gmail|hotmail).com$/;

          return !alreadyExist && formatted;
        },
        msg: "Error in email field",
      },
    },
    password: {
      ...reqString,
      validate: {
        validator: value => /^[a-zA-z0-9]{1,8}$/.test(value),
        msg: "Error in password",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (err) {
    console.log(err);
  }
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
