const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");
const fileControllers = require("../controllers/fileControllers");
const authorization = require("../controllers/authorization");
const renewAccess = require("../controllers/renewAccess");

router.route("/").get((req, res) => {
  res.json("hello");
});

router.route("/signup").post(userControllers.signup);
router.route("/login").post(userControllers.login);
router.route("/signout").delete(authorization, userControllers.signout);

router
  .route("/update-profile")
  .put(authorization, renewAccess, userControllers.updateProfile);

router.route("/new-password").put(userControllers.newPassword);

router.route("/retrieve/:userId").get(authorization, userControllers.retrieve);

router.route("/auth-test").get(authorization, userControllers.authTest);

module.exports = router;
