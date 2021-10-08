const mongoose = require("mongoose");
const UserModel = require("../../../models/UserModel");
const RefreshTokenModel = require("../../../models/RefreshTokenModel");
const FolderModel = require("../../../models/FolderModel");
const bcrypt = require("bcryptjs");

module.exports = async function signout(req, res, next) {
  const { userData } = req.body;
  if (!userData) return res.sendStatus(400);

  //   res.json({ userData });
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userDoc = await UserModel.findOne({ email: userData.email }, null, {
      session,
    });
    if (!userDoc) return res.sendStatus(404);

    const passMatch = await bcrypt.compare(userData.password, userDoc.password);
    if (!passMatch) return res.sendStatus(404);

    await UserModel.findByIdAndDelete(userDoc._id, { session });
    await RefreshTokenModel.findOneAndDelete(
      {
        userId: userDoc._id,
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.sendStatus(200);
  } catch (err) {
    session.abortTransaction();

    console.log(err);
    res.sendStatus(400);
  }
};
