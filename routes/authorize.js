const router = require("express").Router();
const { register, login } = require("../controllers/authorize");

//routes
// /login/register -> to create a new user
// /login -> log user in
router.post("/register", register);
router.post("/", login);

module.exports = router;
