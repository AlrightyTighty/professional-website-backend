const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/postits");

const imageSchema = new mongoose.Schema({
  dataURI: String,
});

const Image = mongoose.model("Image", imageSchema);

app.use(cors({ origin: "http://localhost:5173" }));

app.delete("/clear", async (req, res) => {
  const allImages = await Image.find();
  for (image in allImages) {
    await Image.deleteOne({ _id: allImages[image]._id });
  }
  res.status(200).send("All post-its cleared");
});

app.post("/stickynote", express.json(), async (req, res) => {
  const imgData = req.body.image;
  console.log(imgData);
  const img = new Image({
    dataURI: imgData,
  });

  const result = await img.save();
  res.status(200).json(result);
});

app.get("/stickynote", async (req, res) => {
  const allImages = await Image.find();
  res.status(200).json(allImages);
});

app.listen(3000, () => console.log("Listening on port 3000..."));
