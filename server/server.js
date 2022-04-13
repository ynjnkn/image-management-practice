// Dependencies
const express = require("express");
const app = express();

// Environment Variables
const { PORT } = process.env;

// Routers
const { uploadRouter } = require("./routes/");

const server = async () => {
  try {
    // Check Environment Variables
    if (!PORT) throw new Error("PORT is undefined");

    // Middlewares
    app.use(express.json());
    app.use("/uploads", express.static("uploads"));
    app.use("/uploads", uploadRouter);

    // Starts Listening
    app.listen(PORT, async () => {
      console.log(`Server listening on Port ${PORT}`);
    });
  } catch (error) {
    console.log({ error: { name: error.name, message: error.message } });
  }
};

server();
