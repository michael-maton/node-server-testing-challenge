const express = require("express");

const Avengers = require("./avengers/avengers-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/avengers", (req, res) => {
    Avengers.getAll()
        .then((avengers) => {
            res.status(200).json(avengers);
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
});

module.exports = server;
