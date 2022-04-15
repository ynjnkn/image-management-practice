const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    key: { type: String, required: true },
    originalFileName: { type: String, required: true },
  },
  { timestamps: true }
);

const Image = model("image", imageSchema);
module.exports = { Image };
