const mongoose = require("mongoose");
const slugify = require("slugify");

// regular expressions to check url and email provided is a valid one
const url_re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
const email_re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SellerSchema = new mongoose.Schema({
  //
  name: {
    type: String,
    required: [true, "Please include a name for the seller."],
    maxlength: [50, "Name is longer than 50 characters."],
  },
  email: {
    type: String,
    required: [true, "Please include an email address."],
    unique: true,
    match: [email_re, "Please use a valid email address."],
    maxlength: [50, "Seller email is longer than 50 characters."],
  },
  slug: String,
  password: {
    type: String,
    required: true,
  },
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

// middleware to tidy up seller name for views, eg 'Granville Halal Meats' -> 'granville-halal-meals'
CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model("Seller", SellerSchema);
