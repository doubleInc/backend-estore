// import dependecies
const mongoose = require("mongoose");

// regex to validate urls given for image files
const url_re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

//Describe our schema
const userSchema = new mongoose.Schema({
  // Include all the fields required. Hint: We only need an email address, password(dont worry about encryption),
  // image(url for an avatar), created is given below

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export the schema
module.exports = mongoose.model("User", userSchema);
