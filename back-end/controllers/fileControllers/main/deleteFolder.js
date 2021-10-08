const mongoose = require("mongoose");
const FolderModel = require("../../../models/FolderModel");

module.exports = async function deleteFolder({ body, gfs, accessToken }, res) {
  const { folderId, path } = body;
  if (!folderId || !path) return res.sendStatus(400);

  const session = await mongoose.startSession();
  session.startTransaction();

  const query = { dirName: path };
  const options = { session };

  try {
    const subFoldersCount = await FolderModel.countDocuments(query);
    const folderFiles = await gfs.find(query, options).toArray();
    if (subFoldersCount || folderFiles.length) {
      return res.status(403).json("This folder isn't empty.");
    }

    await FolderModel.findByIdAndDelete(folderId, options);

    await session.commitTransaction();
    session.endSession();

    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    session.abortTransaction();

    res.status(400).json(err.message);
  }
};
