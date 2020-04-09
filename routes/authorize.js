const router = require("express").Router();
const { register, login } = require("../controllers/authorize");
const { registerSeller, loginSeller } = require("../controllers/authSeller");

//routes
// /login/register -> to create a new user
// /login -> log user in
router.post("/register", register);
router.post("/", login);

//routes
// /login/register/seller -> to create a new user
// /login/seller -> log user in
router.post("/register/seller", registerSeller);
router.post("/seller", loginSeller);

module.exports = router;
