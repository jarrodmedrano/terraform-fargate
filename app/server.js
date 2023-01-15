const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || "http://localhost:3000";
const API_URL = process.env.API_URL || "http://localhost:5000";

const app = express();

// log all requests
app.use(morgan("common"));

app.get("/health", (req, res) => {
  res.status(200).json({
    health: "ok",
  });
});

app.get("/authConfig.js", function (req, res) {
  fs.readFile(
    path.join(__dirname, "static", "authConfig.js"),
    "utf8",
    function (err, data) {
      if (err) {
        res.sendStatus(404);
      } else {
        let result;
        result = data.replace(/<APP_URL>/g, APP_URL);
        res.send(result);
      }
    }
  );
});

app.get("/api", function (req, res) {
  const tokenHeader = req.headers["authorization"];

  if (tokenHeader === undefined) {
    res.sendStatus(401);
  }

  const parts = tokenHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.sendStatus(401);
  }

  fetch(`${API_URL}/api`, {
    method: "GET",
    headers: { Authorization: tokenHeader },
  })
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((json) => {
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get("/secret", function (req, res) {
  const secret = process.env.SECRET;

  if (secret === undefined) {
    res.sendStatus(404);
  }

  res.json({ name: "SECRET", value: secret });
});

// static files
app.use(express.static("static"));

// wildcard route for index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "/index.html"));
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

module.exports = app;
