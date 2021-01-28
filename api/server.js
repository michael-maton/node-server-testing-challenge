const express = require("express");

const Avenger = require("./avengers/avengers-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/avengers", (req, res) => {
  Avenger.getAll()
    .then((avengers) => {
      res.status(200).json(avengers);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

server.post("/avengers", (req, res) => {
  Avenger.add(req.body)
    .then((avenger) => {
      res.status(201).json(avenger);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

server.delete("/avengers/:id", (req, res) => {
  Avenger.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The avenger has been snapped into dust by Thanos..." });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = server;
