// Dependencies
const { Router } = require("express");
const uploadRouter = Router();

uploadRouter.post("/", async (req, res) => {
  try {
    return res.status(200).json("uploadRouter 실행");
  } catch (error) {
    console.log({ error: { name: error.name, message: error.message } });
    return res
      .status(500)
      .send({ error: { name: error.name, message: error.message } });
  }
});

module.exports = { uploadRouter };
