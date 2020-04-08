const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const geocoder = require("../geocoder");

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
    required: [true, "Please include an email."],
    unique: true,
    match: [email_re, "Please use a valid email."],
    maxlength: [50, "User email is longer than 50 characters."],
  },
  password: {
    type: String,
    required: true,
    required: [true, "Please include a password."],
    minlength: 8,
    select: false,
  },
  image: {
    type: String,
    required: false,
    match: [url_re, "Please use a valid URL for the location of the image."],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  // GeoJson
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// geo location
UserSchema.pre("save", async function (next) {
  //const loc = await geocoder.
  const loc = await geocoder.geocode(this.address);
  // as per node-geocode requirments
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB
  this.address = undefined;

  next();
});

// encrypt password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Static method: sign jwt return
UserSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWTSECRET, {
    expiresIn: process.env.JWTEXPIRE,
  });
};

// match user entered password with hashed db stored one
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
