const express=require('express');
const auth = require('../authMiddleware/authmiddleware');
const { addEmployee, updateEmployee ,deleteEmployee,singleEmployee} = require('../controllers/EmployeeCtrl');
const employeeRoutes=express.Router();

employeeRoutes.post('/addEmployee',auth,addEmployee);
employeeRoutes.put('/updateEmployee/:id',auth,updateEmployee);
employeeRoutes.delete('/deleteEmployee/:id',auth,deleteEmployee);
employeeRoutes.get('/:id',auth,singleEmployee);

module.exports = employeeRoutes;