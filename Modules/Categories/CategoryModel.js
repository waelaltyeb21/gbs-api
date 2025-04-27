const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bookCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("categories", CategorySchema);
