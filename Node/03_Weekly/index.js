// Require Node Packages
const express = require("express");
const handlebars = require("express-handlebars");
const basicAuth = require("express-basic-auth");
const bodyParser = require("body-parser");
const path = require("path");

// Set up express and environment
const app = express();
require("dotenv").config();
const config = require("./config.json").development;
// [process.env.NODE_ENV || "development"];

// Require User create modules
const AuthChallenger = require("./AuthChallenger");
const NoteService = require("./NoteService/NoteService");
const NoteRouter = require("./NoteRouter/NoteRouter");

// Set up connection to postgres database via knex
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Setup handlebars as express template engine
const viewsPath = path.join(__dirname, "./views");

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", viewsPath);

// Setup middleware and serve public folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  basicAuth({
    authorizeAsync: true,
    authorizer: AuthChallenger(knex),
    challenge: true,
    realm: "Note Taking with knex",
  })
);

//Note that the authorizer function above is expected to be synchronous. This is the default behavior, you can pass authorizeAsync: true in the options object to indicate that your authorizer is asynchronous. In this case it will be passed a callback as the third parameter, which is expected to be called by standard node convention with an error and a boolean to indicate if the credentials have been approved or not.

// Setup noteService

const noteService = new NoteService(knex);
app.get("/", (req, res) => {
  console.log("get request ");
  console.log(req.auth.user);
  res.render("index", {
    user: req.auth.user,
  });
  // res.send("hi");
});

// Setup route to handler to send index page
// app.get("/", async (req, res) => {
//   let data = await noteService.list(req.auth.user);

//   let array = data.map((x) => x.content);
//   console.log(array);

//   res.render("index", {
//     user: req.auth.user,
//     notes: array,
//   });
// });

// Promise version - load notes in response - client side rendering
// noteService.list(req.auth.user).then((data) => {
//   console.log(data);

//   let array = data.map((x) => x.content);
//   console.log(array);

//   res.render("index", {
//     user: req.auth.user,
//     notes: array,
//   });
// });

// Set up routes to /api/notes
app.use("/api/notes/", new NoteRouter(noteService).router());

app.listen(config.port, () =>
  console.log(`Note Taking application listening to ${config.port}!`)
);

module.exports.app = app;
