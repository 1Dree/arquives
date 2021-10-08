module.exports = async function upload({ file, query, db, accessToken }, res) {
  try {
    await db.collection("uploads.files").updateOne(
      { filename: file.filename },
      {
        $set: {
          originalname: file.originalname,
          ownerId: query.ownerId,
          dirName: query.dirName,
          icon: file.icon,
        },
      }
    );

    res.json({ file, accessToken });
  } catch (err) {
    console.log(err);

    res.status(400).json(err.message);
  }
};
