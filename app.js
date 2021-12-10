var http = require("http");
var path = require("path");
var express = require("express")
var logger = require("morgan")
var bodyParser = require("body-parser");
const { response } = require("express");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Creating a global array to store all entries
var entries = []; 
// Make entries available in all views
app.locals.entries = entries;

// Use morgan to log every request
app.use(logger("dev"))

// Populate the req.body variable if the user is submiting a form
app.use(bodyParser.urlencoded({ extended: false }))

// Routing handlers
app.get("/", function(request, reponse) {
    response.render("index")
})

app.get("/new-entry", function(request, response) {
    response.render("new-entry")
})

app.post("/new-entry", function(request, response) {
    if(!request.body.title || !request.body.body) {
        response.status(400).send("Entries must have a title and a body.");
    }
    entries.push({
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    })
    response.redirect("/");
})

app.use(function(request, response) {
    response.status(404).render("404");
})

http.createServer(app).listen(3000, function() {
    console.log("Guest-Book started on port 3000.")
})