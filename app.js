var http = require("http");
var path = require("path");
var express = require("express")
var logger = require("morgan")
var bodyParser = require("body-parser")

var app = express();

app.set("views", path.resolve(__dirname, "views"));