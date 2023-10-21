const mongoose = require("mongoose");

const EventsWorldSchema = mongoose.Schema(
  {
    name: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EventsWorld", EventsWorldSchema);
