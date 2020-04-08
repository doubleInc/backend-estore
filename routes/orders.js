const router = require("express").Router();
const { getOrders, createOrder, getOrder } = require("../controllers/orders");

//routes
router.route("/").get(getOrders).post(createOrder);
router.route("/:id").get(getOrder);

module.exports = router;
