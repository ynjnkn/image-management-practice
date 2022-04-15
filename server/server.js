// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Environment Variables
const { PORT, MONGODB_URI } = process.env;

// Routers
const { uploadRouter } = require("./routes/");

const server = async () => {
  try {
    // Check Environment Variables
    if (!MONGODB_URI) throw new Error("MONGODB_URI is undefined");
    if (!PORT) throw new Error("PORT is undefined");

    // Connect MongoDB
    await mongoose.connect(MONGODB_URI);
    mongoose.set("debug", false);
    console.log("MongoDB Connected");

    // Middlewares
    app.use(express.json());
    app.use("/images", express.static("uploads"));
    app.use("/images", uploadRouter);

    // Starts Listening
    app.listen(PORT, async () => {
      console.log(`Server listening on Port ${PORT}`);
    });
  } catch (error) {
    console.log({ error: { name: error.name, message: error.message } });
  }
};

server();
