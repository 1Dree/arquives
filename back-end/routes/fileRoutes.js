const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const fileControllers = require("../controllers/fileControllers");
const authorization = require("../controllers/authorization");
const renewAccess = require("../controllers/renewAccess");

const router = express.Router();
const { MONGODB_URL } = process.env;

const storage = new GridFsStorage({
  url: MONGODB_URL,
  file: fileControllers.toFile,
});
const upload = multer({ storage });

router.use(
  /\/(upload|retrieve|delete-file|create-folder|delete-folder|delete-all)/,
  authorization,
  renewAccess
);

router
  .route("/upload")
  .post(
    fileControllers.checkFolder,
    upload.single("file"),
    fileControllers.upload
  );

router.route("/retrieve").put(fileControllers.retrieve);

router.route("/delete-file").delete(fileControllers.deleteFile);

router.route("/create-folder").post(fileControllers.createFolder);

router.route("/delete-folder").delete(fileControllers.deleteFolder);

router.route("/delete-all").delete(fileControllers.deleteAll);

router
  .route("/open/:filename")
  .get(
    fileControllers.onOpenFile,
    authorization,
    renewAccess,
    fileControllers.openFile
  );

module.exports = router;
