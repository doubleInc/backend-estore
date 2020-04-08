// import model
const Order = require("../models/Order");

// get all orders
exports.getOrders = async (req, res, next) => {
  // req.query for searches; /orders?<key>=<value>
  const orders = await Order.find(req.query);

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
};

// Create
//app.post("/", (req, res) => {}
exports.createOrder = async (req, res, next) => {
  //TEST: console.log(req.body);
  //ADD TO DB: Promise method - Order.create(req, res).then()
  // Async/await method
  const Order = await Order.create(req.body);

  res.status(201).json({
    success: true,
    data: Order,
  });
};

// Get single
exports.getOrder = async (req, res, next) => {
  // Async/await method
  const order = await Order.findById(req.params.id);

  //handle incorrect id format with if -> (!Order) return res.status(400).json({success: false})

  res.status(200).json({
    success: true,
    data: order,
  });
};

//Update and delete not included, since orders should always remain in DB/history
