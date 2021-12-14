/**********************************************
 * Notetaking Application Challenge
 * ==================================
 ***********************************************/

/** # Import all libraries  #
/*  ====================== */
// 1) Import all required modules

// In-built Node Modules (filesystem and path)
const path = require("path")
// NPM installed modules
const express = require("express");
const basicAuth = require("express-basic-auth");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
// Set up your application, import the required packages
// Capitalize when it is a class

const config = require("./Stores/config.json").development;
require("dotenv").config();
const AuthChallenger = require("./AuthChallenger");
const NoteService = require("./Services/NoteService");
const NoteRouter = require("./Routers/NoteRouter");
const knexFile = require('./knexfile').development;
const knex = require('knex')(knexFile);
/** # Configure Express #
/*  ====================== */
// 2) Configure Express
app.engine("handlebars", engine({defaultLayout:"main"}));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, "./views"));
require('dotenv').config()

// Set up handlebars (set up engine and register handlebars with express)
// Look at the example from the lecture: https://xccelerate.talentlms.com/unit/view/id:2002

// Set up Express
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
// Set up any middleware required, like express.json()
app.use(express.json());
// Set up and configure express-basic-auth using the AuthChallenger
app.use(
  basicAuth({
    authorizeAsync: true,
    authorizer: AuthChallenger(knex),
    challenge: true,
  })
);
/** # Set up NoteService  #
/*  ====================== */
// 3) Past in the file into the noteservice class
const noteService = new NoteService(knex);
app.get("/", (req, res) => {
  res.render("index", {
    user: req.auth.user,
  });
});

/** # Set up basic express server  #
/*  ====================== */
// 4) Set up basic express server
// Set up your route handler for '/' ==> send and index page to the users
//app.get("/", (req, res) => {
  // Create a callback function
  // You always need a .then to
//});

// DONT DO STEP FOUR UNTIL NEXT WEEK
/** # Set up authentication   #
/*  ====================== */
// 5) Set up authentication
// Set up basic auth
// DONT DO THE ABOVE PART UNTIL NEXT WEEK

/** # Set up routes from noteservice  #
/*  ====================== */
// 6) Create a new instance of noteService and pass the file path/to/the/file where you want the service to read from and write to.
app.use("/api/notes/", new NoteRouter(noteService).router());

/** #  Set up Note Router  #
/*  ====================== */
// 7) Set up the NoteRouter - handle the requests and responses in the note, read from a file and return the actual data, get the note from your JSON file and return to the clients browser.
// any notes that go to api/routes will go to noterouter
// /api/notes/:id

// make your application listen to a port of your choice.
app.listen(config.port, () => {
  console.log("Listening on 3000");
});

module.exports.app = app;
