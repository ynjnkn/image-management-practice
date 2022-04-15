// Dependencies
const { Router } = require("express");
const uploadRouter = Router();
const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

// Models
const { Image } = require("../models/");

// Multer Configurations
const acceptedImageFileFormats = [
  "image/apng",
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
];
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (acceptedImageFileFormats.includes(file.mimetype)) cb(null, true);
    else {
      const error = new Error("Invalid file type");
      error.name = "MulterError";
      cb(error, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // ~5MB
  },
});

// APIs
uploadRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const image = new Image({
      key: req.file.filename,
      originalFileName: req.file.originalname,
    });
    await image.save();
    console.log(req.file);
    return res.status(200).json(image);
  } catch (error) {
    console.log({ error: { name: error.name, message: error.message } });
    return res
      .status(500)
      .send({ error: { name: error.name, message: error.message } });
  }
});
uploadRouter.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    return res.status(200).json(images);
  } catch (error) {
    console.log({ error: { name: error.name, message: error.message } });
    return res
      .status(500)
      .send({ error: { name: error.name, message: error.message } });
  }
});

module.exports = { uploadRouter };
