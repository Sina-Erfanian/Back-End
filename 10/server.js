// model view controller (MVC) design pattern
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logEvents");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const corsOption = require("./config/corsOptions");
app.use(logger);
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/employees", require("./routes/api/employees"));
app.all("*", (req, res) => {
  res.send("Not found(404)");
});
app.use(errorHandler);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
