const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// GET all employees
router.get("/list", employeeController.getEmployees);

// Create a new employee
router.post("/create", employeeController.createEmployee);

// Update an employee
router.put("/update/:id", employeeController.updateEmployee);

// Delete an employee
router.delete("/delete/:id", employeeController.deleteEmployee);

module.exports = router;
