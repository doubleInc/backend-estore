const mongoose = require("mongoose");

// regular expressions to check url and email provided is a valid one
const url_re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
const email_re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = new mongoose.Schema({
  //
  name: {
    type: String,
    required: [true, "Please include a name for the user."],
    maxlength: [50, "Name is longer than 50 characters."],
  },
  email: {
    type: String,
    required: [true, "Please include a an email."],
    unique: true,
    match: [email_re, "Please use a valid email."],
    maxlength: [50, "User email is longer than 50 characters."],
  },
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

module.exports = mongoose.model("User", UserSchema);
