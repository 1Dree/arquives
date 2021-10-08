const UserModel = require("../../../models/UserModel");
const bcrypt = require("bcryptjs");

module.exports = async function newPassword(req, res) {
  const { userEmail, newPassword } = req.body;
  if (!userEmail || !newPassword) return res.sendStatus(400);

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    await UserModel.findOneAndUpdate(
      { email: userEmail },
      {
        $set: { password: hash },
      },
      { new: true }
    );

    res.sendStatus(200);
  } catch (err) {
    session.abortTransaction();

    console.log(err);
    res.sendStatus(400);
  }
};
