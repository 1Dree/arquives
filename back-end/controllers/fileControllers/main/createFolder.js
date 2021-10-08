const FolderModel = require("../../../models/FolderModel");

module.exports = async function createFolder({ body, accessToken }, res) {
  const { folderName, ownerId, dirName, path } = body;
  if (!folderName || !ownerId || !dirName || !path) return res.sendStatus(400);

  try {
    const folderDoc = await FolderModel.create({
      name: folderName,
      ownerId,
      dirName,
      path,
    });

    res.json({ folderDoc, accessToken });
  } catch (err) {
    console.log(err);

    res.sendStatus(400);
  }
};
