const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config();

const renewAccess = require("./controllers/renewAccess");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");

const { MONGODB_URL } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://myarquives.netlify.app/");
});
app.use(methodOverride("_method"));

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(process.env.PORT || 3000, () => console.log("listening"))
  )
  .catch(console.log);

const conn = mongoose.connection;
let gfs, db;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  db = conn.db;
});

const midProvider = (req, res, next) => {
  req.gfs = gfs;
  req.db = db;
  next();
};

app.use(midProvider);

app.use("/user", userRoutes);
app.use("/file", fileRoutes);

app.post("/renew-access", renewAccess, (req, res) => {
  res.json({ accessToken: req.accessToken });
});

app.get("/", (req, res) => res.json("hello"));
