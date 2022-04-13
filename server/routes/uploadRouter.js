// Dependencies
const { Router } = require("express");
const uploadRouter = Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

uploadRouter.post("/", upload.single("imageTest"), async (req, res) => {
  try {
    console.log(req.file);
    return res.status(200).json(req.file);
  } catch (error) {
    console.log({ error: { name: error.name, message: error.message } });
    return res
      .status(500)
      .send({ error: { name: error.name, message: error.message } });
  }
});

module.exports = { uploadRouter };
