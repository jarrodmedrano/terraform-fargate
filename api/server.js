const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

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
  res.status(200).json({
    health: "ok",
  });
});

app.get("/api/check", (req, res) => {
  console.log("requested the check api");
  res.status(200).json({
    hello: "baby",
  });
});

app.get("/api", (req, res) => {
  // service relies on the name claim
  res.status(200).send("api");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

module.exports = app;
