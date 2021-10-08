const mongoose = require("mongoose");
const FolderModel = require("../../../models/FolderModel");

module.exports = async function deleteAll({ body, gfs, accessToken }, res) {
  const { ownerId } = body;
  if (!ownerId) return res.sendStatus(400);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await FolderModel.deleteMany(
      { ownerId },
      {
        session,
      }
    );

    const files = await gfs.find({ ownerId }, { session }).toArray();

    if (files.length) {
      files.forEach(
        async file => await gfs.delete(new mongoose.Types.ObjectId(file._id))
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ accessToken });
  } catch (err) {
    console.log(err);

    session.abortTransaction();
    res.status(400).json(err.message);
  }
};
