// import model
const Item = require("../models/Item");

// get all items
exports.getItems = async (req, res, next) => {
  try {
    // req.query for searches; /Items?<key>=<value>
    const items = await Item.find(req.query);

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    return next(err);
  }
};

// Create
//app.post("/", (req, res) => {}
exports.createItem = async (req, res, next) => {
  //TEST: console.log(req.body);
  //ADD TO DB: Promise method - Item.create(req, res).then()
  // Async/await method
  const item = await Item.create(req.body);

  res.status(201).json({
    success: true,
    data: item,
  });
};

// Get single
exports.getItem = async (req, res, next) => {
  // Async/await method
  const item = await Item.findById(req.params.id);

  //handle incorrect id format with if -> (!item) return res.status(400).json({success: false})

  res.status(200).json({
    success: true,
    data: item,
  });
};

//Update PUT
//app.put("/:id", (req, res) => {...res.params.id...}
exports.updateItem = async (req, res, next) => {
  // Async/await method
  // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
    data: item,
  });
};

//delete
//app.put("/:id", (req, res) => {...res.params.id...}
exports.deleteItem = async (req, res, next) => {
  // Async/await method
  // findByIdAndUpdate takes search by param and object to replace/update, finally options obj
  const item = await Item.findByIdAndDelete(req.params.id);

  if (!item) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({
    success: true,
  });
};
