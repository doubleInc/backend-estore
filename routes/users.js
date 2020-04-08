const router = require("express").Router();
const auth = require("../auth");

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

//routes
router.route("/").get(getUsers).post(createUser);
// added auth requesting jwt in header for access
router
  .route("/:id")
  .get(auth, getUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

module.exports = router;
