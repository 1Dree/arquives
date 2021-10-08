const jwt = require("jsonwebtoken");

const userCoreData = userData => ({
  _id: userData._id,
  email: userData.email,
  password: userData.password,
});

const generateAccessToken = data => {
  return jwt.sign(userCoreData(data), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};

const generateRefreshToken = data => {
  return jwt.sign(userCoreData(data), process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  userCoreData,
  generateAccessToken,
  generateRefreshToken,
};
