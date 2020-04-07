const router = require("express").Router();
const { getOrders } = require("../controllers/orders");

//routes
router.route("/").get(getOrders);
//router.route("/").get(getOrders).post(createOrder);

//router.route("/:id").get(getOrder).put(updateOrder).delete(delOrder);

module.exports = router;
