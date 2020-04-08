const router = require("express").Router();
const {
  getSellers,
  createSeller,
  getSeller,
  updateSeller,
  deleteSeller,
} = require("../controllers/sellers");

//routes
router.route("/").get(getSellers).post(createSeller);
router.route("/:id").get(getSeller).put(updateSeller).delete(deleteSeller);

module.exports = router;
