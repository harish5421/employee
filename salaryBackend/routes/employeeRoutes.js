const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// Create Employee
router.post('/addEmployee', async (req, res) => {
  try {
    const { employeeName, employeeId, department, sex, maritalStatus, salary, address } = req.body;
    console.log("body",req.body);
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      department,
      sex,
      maritalStatus,
      salary,
      address
    });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Employees
router.get('/getAllEmployees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//one employee
router.get('/getEmployee/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Edit Employee
router.put('/edit/:employeeId', async (req, res) => {
  try {
    const { employeeName, department, sex, maritalStatus, salary, address } = req.body;

    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeId: req.params.employeeId }, // Find by employeeId
      { employeeName, department, sex, maritalStatus, salary, address },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Employee
// DELETE /api/employees/deleteByEmployeeId/:employeeId
router.delete('/deleteByEmployeeId/:employeeId', async (req, res) => {
  try {
    // const { employeeId } = req.params;

    const deletedEmployee = await Employee.findOneAndDelete({ employeeId: req.params.employeeId });


    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully', deletedEmployee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;