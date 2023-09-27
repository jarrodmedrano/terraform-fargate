const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;

const app = express();

// log all requests
app.use(morgan("common"));

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/health", (req, res) => {
  console.log("request from /health", req);
  console.log("res from /health", res);
  res.status(200).json({
    health: "ok",
  });
});

app.get("/check", (req, res) => {
  res.status(200).send("Hello, this is the check endpoint!");
});

app.get("/api", (req, res) => {
  // service relies on the name claim
  res.status(200).send("api");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

module.exports = app;
