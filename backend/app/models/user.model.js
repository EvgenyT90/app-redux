const mongoose = require("mongoose");

const UserDataSchema = mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserData", UserDataSchema);
