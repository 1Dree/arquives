const mongoose = require("mongoose");
const FolderModel = require("../../../models/FolderModel");

module.exports = async function checkFolder({ query: { dirName } }, res, next) {
  try {
    if (dirName !== "root") {
      const folder = await FolderModel.findOne({ path: dirName });

      if (!folder) {
        return res.status(400).json(`the path '${dirName}' does not exist.`);
      }
    }

    next();
  } catch (err) {
    console.log(err);

    res.sendStatus(400);
  }
};
