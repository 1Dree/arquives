const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reqString = {
  type: String,
  required: true,
};

const folderSchema = new Schema(
  {
    ownerId: mongoose.Types.ObjectId,
    dirName: reqString,
    path: reqString,
    name: reqString,
  },
  { timestamps: true }
);

folderSchema.path("name").validate(async value => {
  const docs = await mongoose.models.folder.countDocuments({
    name: value,
  });

  return !docs;
}, "There is already a folder with this name.");

const FolderModel = mongoose.model("folder", folderSchema);

module.exports = FolderModel;
