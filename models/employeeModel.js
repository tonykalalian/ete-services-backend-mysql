const db = require("../config/db");

// Get all employees
exports.getAllEmployees = (callback) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, callback);
};

// Create a new employee
exports.createEmployee = (employeeData, callback) => {
  const { fullName, email, age, country } = employeeData;
  const sql =
    "INSERT INTO employee (fullName, email, age, country) VALUES (?, ?, ?, ?)";
  db.query(sql, [fullName, email, age, country], callback);
};

// Update an employee
exports.updateEmployee = (id, employeeData, callback) => {
  const { fullName, email, age, country } = employeeData;
  const sql =
    "UPDATE employee SET fullName = ?, email = ?, age = ?, country = ? WHERE id = ?";
  db.query(sql, [fullName, email, age, country, id], callback);
};

// Delete an employee
exports.deleteEmployee = (id, callback) => {
  const sql = "DELETE FROM employee WHERE id = ?";
  db.query(sql, [id], callback);
};
