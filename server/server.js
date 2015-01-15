var app, express, path;

express = require("express");

path = require("path");

app = express();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

app.set("port", process.env.PORT || 8888);

app.set("view engine", "ejs");

app.engine("html", require("ejs").renderFile);

app.use(express.logger("dev"));

app.use(express.urlencoded());

app.use(express.json());

app.use(express.methodOverride());

app.use(app.router);

app.configure("production", function() {
  app.set("views", __dirname);
  app.use(express["static"](__dirname));
  return app.use(function(req, res) {
    return res.render("index.html");
  });
});

app.configure("development", function() {
  app.set("views", "" + __dirname + "/../generated/");
  app.use(express["static"]("" + __dirname + "/../generated"));
  return app.use(function(req, res) {
    return res.render("index.html");
  });
});

module.exports = app;

app.listen(app.get("port"), function() {
  return console.log("Express server listening on port " + (app.get("port")) + " in " + (app.get("env")) + " mode");
});
