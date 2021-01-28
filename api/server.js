const express = require("express");

const Avengers = require("./avengers/avengers-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
