// import model
const User = require("../models/User");

// get all Users
exports.getUsers = async (req, res, next) => {
  // req.query for searches; /Users?<key>=<value>
  const users = await User.find(req.query);

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

// Create
//app.post("/", (req, res) => {}
exports.createUser = async (req, res, next) => {
  //TEST: console.log(req.body);
  //ADD TO DB: Promise method - User.create(req, res).then()
  // Async/await method
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
};

// Get single
exports.getUser = async (req, res, next) => {
  // Async/await method
  const user = await User.findById(req.params.id);

  //handle incorrect id format with if -> (!User) return res.status(400).json({success: false})

  res.status(200).json({
    success: true,
    data: user,
  });
};

//Update PUT
//app.put("/:id", (req, res) => {...res.params.id...}
exports.updateUser = async (req, res, next) => {
  // Async/await method
  // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // if no user found
  if (!user) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
};

//delete
//app.put("/:id", (req, res) => {...res.params.id...}
exports.deleteUser = async (req, res, next) => {
  // Async/await method
  // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
  });
};
