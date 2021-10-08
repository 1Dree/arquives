const crypto = require("crypto");
const path = require("path");

module.exports = async function toFile(
  { gfs, query: { dirName, ownerId } },
  file
) {
  const files = await gfs
    .find({ originalname: file.originalname, dirName, ownerId })
    .toArray();
  if (files.length) throw new Error("this file already exists");

  if (/^image\/(jpeg|jpg|png)$/.test(file.mimetype)) {
    file.icon = "/imageI";
  } else if (/^application\/(pdf)$/.test(file.mimetype)) {
    file.icon = "/fileI";
  } else {
    throw new Error("Only images and PDFs are accepted.");
  }

  return new Promise((resolve, reject) => {
    const cryptoCallBack = (err, buf) => {
      if (err) {
        return reject(err);
      }

      const filename = buf.toString("hex") + path.extname(file.originalname);
      const fileInfo = {
        filename,
        bucketName: "uploads",
      };

      resolve(fileInfo);
    };

    crypto.randomBytes(16, cryptoCallBack);
  });
};
