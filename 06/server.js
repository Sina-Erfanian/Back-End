const express = require("express");
const app = express();
// console.log(app);
const path = require("path");
const PORT = process.env.PORT || 3500;

// we specify the http method that we want to route
// if the route match with / or index.html the file is send
app.get("^/$|/index.html", (req, res) => {
  // res.send("Hello World!");
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// here we make .html optional
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// redirect
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

// Route Handlers
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

// Chaining Route Handlers
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

// 404
app.get("/*", (req, res) => {
  // res.status(404).sendFile(path.join(__dirname), "views", "404.html");
  res.send("Not found(404)");
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
