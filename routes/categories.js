const router = require("express").Router();
const { getCategories, createCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/categories");

//routes
router.route("/").get(getCategories).post(createCategory);
router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory)

//router.route("/:id").get(getOrder).put(updateOrder).delete(delOrder);

module.exports = router;
