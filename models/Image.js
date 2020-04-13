const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  //
  name: {
    type: String,
    default:
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15),
  },
  slug: String,
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
