const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

app.use(logger);

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));
// we use this line to apply css in subdir routes
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.send("Not found(404)");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
