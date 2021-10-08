const signup = require("./main/signup");
const authTest = require("./main/authTest");
const login = require("./main/login");
const signout = require("./main/signout");
const updateProfile = require("./main/updateProfile");
const retrieve = require("./main/retrieve");
const newPassword = require("./main/newPassword");

module.exports = {
  signup,
  login,
  signout,
  updateProfile,
  authTest,
  retrieve,
  newPassword,
};
