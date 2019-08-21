const express = require("express");
const app = express(); // crea una instancia de una aplicación de express
const nunjucks = require("nunjucks");
const https = require("https");
const http = require("http");

var myLogger = function(req, res, next) {
  console.log("LOGGED");
  next();
};

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

nunjucks.configure("views", {
  autoescape: true,
  noCache: true,
  express: app
});

nunjucks.render("index.html", people, function(err, res) {
  if (err) throw err;
  console.log(res);
});

http.createServer(app).listen(80);
https.createServer(app).listen(443);

app.engine("html", nunjucks.render);
app.set("view engine", "html");

app.use(myLogger);

app.get("/", function(req, res) {
  res.render("index", { title: "TooOooOOnto a las tres", people: people});
});

app.post("/", function() {
  res.send("Estoy usando un method shitPOSTeando hahaaa");
});

app.get("/special*", function(req, res) {
    res.render("index", { people: title, people: people });
});

app.listen(8080);
