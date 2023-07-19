const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// To parse incoming JSON data
app.use(bodyParser.json());

// MySQL Database connection
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "ete-services",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// GET all employees
app.get("/employee/list", (req, res) => {
  const sql = "SELECT * FROM employee";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving employees:", err);
      res.status(500).json({ error: "Error retrieving employees" });
      return;
    }
    res.json(results);
  });
});

// create a new employee
app.post("/employee/create", (req, res) => {
  const { fullName, email, age, country } = req.body;
  const sql =
    "INSERT INTO employee (fullName, email, age, country) VALUES (?, ?, ?, ?)";
  connection.query(sql, [fullName, email, age, country], (err, result) => {
    if (err) {
      console.error("Error creating employee:", err);
      res.status(500).json({ error: "Error creating employee" });
      return;
    }
    const newEmployee = { id: result.insertId, fullName, email, age, country };
    res.json(newEmployee);
  });
});

// update an employee
app.put("/employee/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { fullName, email, age, country } = req.body;
  const sql =
    "UPDATE employee SET fullName = ?, email = ?, age = ?, country = ? WHERE id = ?";
  connection.query(sql, [fullName, email, age, country, id], (err, result) => {
    if (err) {
      console.error("Error updating employee:", err);
      res.status(500).json({ error: "Error updating employee" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json({ id, fullName, email, age, country });
  });
});

// DELETE an employee
app.delete("/employee/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "DELETE FROM employee WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      res.status(500).json({ error: "Error deleting employee" });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.json({ message: "Employee deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Express server listening on http://localhost:${port}`);
});
