const Seller = require("../models/Seller");

// register a seller
// ROUTE: POST /login/register
exports.registerSeller = async (req, res, next) => {
  const { name, email, password, image, address } = req.body;

  // create seller
  const seller = await Seller.create({
    name,
    email,
    password,
    image,
    address,
  });

  // create token
  const token = seller.getJWT();

  // respond with token
  res.status(200).json({
    success: true,
    token,
  });
};

// register a seller
// ROUTE: POST /login
exports.loginSeller = async (req, res, next) => {
  const { email, password } = req.body;

  // validate
  if (!email || !password) {
    return res.status(500);
  }

  // find a seller
  const seller = await Seller.findOne({ email }).select("+password");

  //if no seller
  if (!seller) {
    return res.status(401);
  }

  // check passwords match
  const isMatch = await seller.comparePassword(password);

  if (!isMatch) {
    return res.status(401);
  }

  // create token
  const token = seller.getJWT();

  // respond with token
  res.status(200).json({
    success: true,
    token,
  });
};
