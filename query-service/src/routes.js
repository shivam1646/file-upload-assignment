const express = require('express');
const router = express.Router();

const EmployeeController = require('./controllers/employee.controller');

const employeeController = new EmployeeController();

router.get('/employees', employeeController.getAll.bind(employeeController));

module.exports = router;
