const mongoose = require("mongoose");
const slugify = require("slugify");

// regular expression to check url provided is a valid one
const url_re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

const CategorySchema = new mongoose.Schema({
  //
  name: {
    type: String,
    required: [true, "Please include a name for the category."],
    unique: true,
    maxlength: [50, "Category name is longer than 50 characters."],
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

// middleware to tidy up category name for views, eg 'Frozen Meals' -> 'frozen-meal'
CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
