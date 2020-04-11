const router = require("express").Router();
const {
  getSellers,
  createSeller,
  getSeller,
  updateSeller,
  deleteSeller,
  getSellerInLocale,
  sellerCloudinary,
} = require("../controllers/sellers");
const upload = require('../multerConfig');

//routes
router.route("/").get(getSellers).post(createSeller);
router.route("/:id").get(getSeller).put(updateSeller).delete(deleteSeller);

// find stores in locale
router.route("/local/:postcode/:distance").get(getSellerInLocale);

// images
router.post('/addImage', upload.any(), sellerCloudinary);

module.exports = router;
