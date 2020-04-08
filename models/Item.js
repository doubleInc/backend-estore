const mongoose = require("mongoose");
const slugify = require("slugify");

// regular expression to check url provided is a valid one
const url_re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

const ItemSchema = new mongoose.Schema({
  //
  name: {
    type: String,
    required: [true, "Please include a name for the Item."],
    unique: true,
    maxlength: [80, "Item name is longer than 80 characters."],
  },
  price: {
    type: Decimal128,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  slug: String,
  image: {
    type: String,
    required: false,
    match: [url_re, "Please use a valid URL for the location of the image."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// middleware to tidy up Item name for views, eg 'Chocolate Cake' -> 'chocolate-cake'
ItemSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Item", ItemSchema);
