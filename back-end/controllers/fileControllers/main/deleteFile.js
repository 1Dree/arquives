const mongoose = require("mongoose");

module.exports = async function deleteFile({ body, gfs, accessToken }, res) {
  const { fileId } = body;
  if (!fileId) return res.status(400).json("File id is necessary.");

  try {
    await gfs.delete(new mongoose.Types.ObjectId(fileId));

    res.json({ accessToken });
  } catch (err) {
    console.log(err);

    res.status(400).json(err.message);
  }
};
