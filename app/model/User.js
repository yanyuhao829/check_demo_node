const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const md5 = require("md5-node")
// const schema = mongoose.Schema;
// const model = mongoose.model;

const UserSchema = new Schema({
  username: { type: String, require: true },
  password: {
    type: String,
    set(val) {
      return md5(val);
    },
  },
  name: { type: String, require: true },
  isAdmin: { type: Number },
  number: { type: Number },
});

const User = model("User", UserSchema);

module.exports = User;
