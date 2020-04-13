const router = require("express").Router();
const { getImages, createImage } = require("../controllers/images");

const multipart = require("connect-multiparty");

// Setup multiparty
const multipartMiddleware = multipart();

//routes
router.route("/").get(getImages).post(multipartMiddleware, createImage);
//router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory)

//router.route("/:id").get(getOrder).put(updateOrder).delete(delOrder);

module.exports = router;
