const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/wallet");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  privateKey: String,
  publicKey: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserModel,
};
