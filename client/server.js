const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const DEFAULT_PORT = process.env.PORT || 8080;
const APP_URL = process.env.APP_URL || "localhost";

// initialize express.
const app = express();

// Configure morgan module to log all requests.
app.use(morgan("dev"));

app.get("/authConfig.js", function (req, res) {
  fs.readFile(
    path.join(__dirname, "app", "authConfig.js"),
    "utf8",
    function (err, data) {
      if (err) {
        res.sendStatus(404);
      } else {
        result = data.replace(/<APP_URL>/g, APP_URL);
        res.send(result);
      }
    }
  );
});

// Setup app folders.
app.use(express.static("app"));

// Set up a route for index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(DEFAULT_PORT, () => {
  console.log(`Sample app listening on port ${DEFAULT_PORT}!`);
});

module.exports = app;
