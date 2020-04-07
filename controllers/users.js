// import model
const User = require("../models/User");

// get all users
exports.getUsers = async (req, res, next) => {
  //const users = await User.find();

  // response with json object on success
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

// Create a user using POST
exports.createUser = async (req, res, next) => {
  // Using the request, add the user to the db, finish the below
  //const user = await User.
  // uncomment below once above is completed
  //   res.status(201).json({
  //     success: true,
  //     data: user,
  //   });
};
