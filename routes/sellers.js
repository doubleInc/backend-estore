const router = require("express").Router();
const {
  getSellers,
  createSeller,
  getSeller,
  updateSeller,
  deleteSeller,
  getSellerInLocale,
} = require("../controllers/sellers");

//routes
router.route("/").get(getSellers).post(createSeller);
router.route("/:id").get(getSeller).put(updateSeller).delete(deleteSeller);

// find stores in locale
router.route("/local/:postcode/:distance").get(getSellerInLocale);

module.exports = router;
