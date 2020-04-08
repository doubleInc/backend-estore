// import model
const Seller = require("../models/Seller");

// get all Sellers
exports.getSellers = async (req, res, next) => {
  // req.query for searches; /Sellers?<key>=<value>
  const sellers = await Seller.find(req.query);

  res.status(200).json({
    success: true,
    count: sellers.length,
    data: sellers,
  });
};

// Create
//app.post("/", (req, res) => {}
exports.createSeller = async (req, res, next) => {
  //TEST: console.log(req.body);
  //ADD TO DB: Promise method - Seller.create(req, res).then()
  // Async/await method
  const seller = await Seller.create(req.body);

  res.status(201).json({
    success: true,
    data: seller,
  });
};

// Get single
exports.getSeller = async (req, res, next) => {
  // Async/await method
  const seller = await Seller.findById(req.params.id);

  //handle incorrect id format with if -> (!Seller) return res.status(400).json({success: false})

  res.status(200).json({
    success: true,
    data: seller,
  });
};

//Update PUT
//app.put("/:id", (req, res) => {...res.params.id...}
exports.updateSeller = async (req, res, next) => {
  // Async/await method
  // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
  const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // if no Seller found
  if (!seller) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
    data: seller,
  });
};

//delete
//app.put("/:id", (req, res) => {...res.params.id...}
exports.deleteSeller = async (req, res, next) => {
  // Async/await method
  // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
  const seller = await Seller.findByIdAndDelete(req.params.id);

  if (!seller) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
  });
};
