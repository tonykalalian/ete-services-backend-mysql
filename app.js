const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

app.use("/employee", employeeRoutes);

app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});
