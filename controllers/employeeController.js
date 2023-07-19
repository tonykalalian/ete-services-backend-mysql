const db = require("../config/db");

// GET all employees
exports.getEmployees = (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving employees:", err);
      res.status(500).json({ error: "Error retrieving employees" });
      return;
    }
    res.json(results);
  });
};

// Create a new employee
exports.createEmployee = (req, res) => {
  const { fullName, email, age, country } = req.body;
  const sql =
    "INSERT INTO employee (fullName, email, age, country) VALUES (?, ?, ?, ?)";
  db.query(sql, [fullName, email, age, country], (err, result) => {
    if (err) {
      console.error("Error creating employee:", err);
      res.status(500).json({ error: "Error creating employee" });
      return;
    }
    const newEmployee = {
      id: result.insertId,
      fullName,
      email,
      age,
      country,
    };
    res.json(newEmployee);
  });
};

// Update an employee
exports.updateEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const { fullName, email, age, country } = req.body;
  const sql =
    "UPDATE employee SET fullName = ?, email = ?, age = ?, country = ? WHERE id = ?";
  db.query(sql, [fullName, email, age, country, id], (err, result) => {
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
};

// Delete an employee
exports.deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "DELETE FROM employee WHERE id = ?";
  db.query(sql, [id], (err, result) => {
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
};
