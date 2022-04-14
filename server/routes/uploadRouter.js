// Dependencies
const { Router } = require("express");
const uploadRouter = Router();
const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

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
    else cb(new Error("Invalid File Type"), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // ~5MB
  },
});

uploadRouter.post("/", upload.single("imageTest"), async (req, res) => {
  try {
    return res.status(200).json(req.file);
  } catch (error) {
    console.log({ error: { name: error.name, message: error.message } });
    return res
      .status(500)
      .send({ error: { name: error.name, message: error.message } });
  }
});

module.exports = { uploadRouter };
