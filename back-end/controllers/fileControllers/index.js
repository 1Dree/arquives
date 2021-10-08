const upload = require("./main/upload");
const retrieve = require("./main/retrieve");
const deleteFile = require("./main/deleteFile");
const createFolder = require("./main/createFolder");
const deleteFolder = require("./main/deleteFolder");
const deleteAll = require("./main/deleteAll");
const checkFolder = require("./main/checkFolder");
const toFile = require("./main/toFile");
const openFile = require("./main/openFile");
const onOpenFile = require("./main/onOpenFile");

module.exports = {
  upload,
  retrieve,
  deleteFile,
  createFolder,
  deleteFolder,
  deleteAll,
  checkFolder,
  toFile,
  openFile,
  onOpenFile,
};
