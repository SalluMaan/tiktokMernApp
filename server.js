// ---- App Config
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Data = require("./data");
const Video = require("./dbModel");
// const morgan = require("morgan");
// const expressValidator = require("express-validator");
// var cookieParser = require("cookie-parser");
// const bodyparser = require("body-parser");

// middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeaders("Access-Control-Allow-Origin", "*");
  res.setHeaders("Access-Control-Allow-Headers", "*");
  next();
});
// ---- Database Config
const UrlMongoDB =
  "mongodb+srv://admin:Salman123@cluster0.dybdg.mongodb.net/<tiktokClone>?retryWrites=true&w=majority";
mongoose
  .connect(UrlMongoDB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
  })
  .then((d) => console.log("db Connected"))
  .catch((err) => {
    console.log(`DB Connection Error ${err.message}`);
  });

// console.log(Data);
// ---- Api EndPoints
app.get("/", (req, res) => res.status(200).json(Data));
app.post("/addpost", (req, res) => {
  const dbVideos = req.body;
  Video.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/allposts", (req, res) => {
  Video.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("A Node JS API is listening on PORT:", port);
});
