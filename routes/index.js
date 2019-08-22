const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
// Se puede usar solo una linea: const router = require('express').Router();
const tweetBank = require("../tweetyBank");

module.exports = function(io) {
  // parse application/x-www-form-urlencoded
  router.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  router.use(bodyParser.json());

  router.get("/", function(req, res) {
    let tweets = tweetBank.list();
    res.render("index", { tweets: tweets, showForm: true });
  });

  router.get("/users/:name", function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find({ name: name });

    res.render("index", { tweets: list, showForm: true, twittero: name });
  });

  router.get("/tweets/:id", function(req, res) {
    var id = Number(req.params.id);
    var list = tweetBank.find({ id: id });
    res.render("index", { tweets: list });
  });

  router.post("/tweets", function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    var newTweet = { name: name, text: text };
    io.sockets.emit("newTweet", { newTweet });
    res.redirect("/");
  });

  return router;
};
