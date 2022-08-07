// what is middleware ?
// it's really anything between the request and the response
// so the route handlers we created in chapter 6 are really middleware

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")

// custom middleware logger
app.use(logger);

// that allows us to put in domains that can access the routes and otherwise cors will prevent them
const whitelist = ["https://www.google.com", "http://localhost:3500"];
const corsOption = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By CORS"));
    }
  },
};
app.use(cors(corsOption));

// app.use is what we often use to apply middleware to all routes that are coming in
// if we put app.use above our routes then this will apply to all routes that are come in
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

// built-in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello");
    next();
  },
  (req, res) => {
    res.send("Hello World");
  }
);

const one = (req, res, next) => {
  console.log("One");
  next();
};

const two = (req, res, next) => {
  console.log("Two");
  next();
};

const three = (req, res) => {
  console.log("Three");
  res.send("Finished");
};

app.get("/chain(.html)?", [one, two, three]);


// There is a special routing method, app.all(), used to load middleware functions at a path for all HTTP request methods
app.all("*", (req, res) => {
  res.send("Not found(404)");
});

// custom error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
