const mongoose = require("mongoose");
const FolderModel = require("../../../models/FolderModel");

module.exports = async function retrieve({ body, gfs, accessToken }, res) {
  const { ownerId, dirName } = body;
  if (!ownerId || !dirName) return res.sendStatus(400);

  const query = { ownerId, dirName };
  const session = await mongoose.startSession();
  session.startTransaction();
  const options = { session };

  try {
    const files = await gfs.find(query, options).toArray();
    const folders = await FolderModel.find(query, null, options);

    await session.commitTransaction();
    session.endSession();

    res.json({ files, folders, accessToken });
  } catch (err) {
    console.log(err);

    await session.abortTransaction();
    res.sendStatus(400);
  }
};
