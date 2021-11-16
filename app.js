var express = require("express");
const fs = require("fs");
var cors = require("cors");
var app = express();
const path = require("path");
const pathToDate = "./date.json";
const dates = [];
console.log(dates);
var data = require("./data.json");
var planets_now = require('./all-mod.js');


app.use(cors());
app.use(express.urlencoded({
  extended: true
}));

app.get("/date", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/url", (req, res) => {
  res.json(data);
});


app.post("/date", (req, res, next) => {
  const date = req.body;
  // Output the book to the console for debugging
  console.log(date);
  dates.push(date);
  //res.send('Date is added to the database');
  const dateJSON = JSON.stringify(date, null, 4);
  fs.writeFile("date.json", dateJSON, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON date is saved.");
    planets_now();
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  // Add Access Control Allow Origin headers
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Content-Type, application/json"
    );
    next();
  });
});
//app.use(express.static("public"));

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});