const User = require("../models/User");

// register a user
// ROUTE: POST /login/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, image, address } = req.body;

    // create user
    const user = await User.create({
      name,
      email,
      password,
      image,
      address,
    });

    // create token
    const token = user.getJWT();

    // respond with token
    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    //
    res.status(201).json({
      success: false,
      message: err,
    });
  }
};

// register a user
// ROUTE: POST /login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(500);
    }

    // find a user
    const user = await User.findOne({ email }).select("+password");

    //if no user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication error, please check credentials.",
      });
    }

    // check passwords match
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Authentication error, please check credentials.",
      });
    }

    // create token
    const token = user.getJWT();

    // respond with token
    res.status(200).json({
      success: true,
      token,
      userid: user._id,
    });
  } catch (err) {
    res.status(201).json({
      success: false,
      message: err,
    });
  }
};
