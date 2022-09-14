const Employee = require("../models/Employee")
const Manager = require("../models/Manager")
const asyncHandler = require('express-async-handler');
const addEmployee=asyncHandler(
    async(req,res)=>{
        try {
            if(!req.body.empId || !req.body.firstName || !req.body.lastName || !req.body.mobile || !req.body.dob || !req.body.address || !req.body.city ){
                throw new Error("Please enter all the detials");
            }
            if(!req.user){
                throw new Error("Please Login to add employees");  
            }
            console.log(req.user);
            const employee=await new Employee(req.body).save();
            await Manager.findByIdAndUpdate(req.user._id,{$push:{employees:employee.id}});
            res.json(employee);
        } catch (error) {
           throw new Error(error);
        }
    }
)
const updateEmployee=asyncHandler(
    async(req,res)=>{
    
        try {
            if( !req.body.firstName || !req.body.lastName || !req.body.mobile || !req.body.dob || !req.body.address || !req.body.city ){
                throw new Error("Please enter all the detials");
            }
            if(!req.user){
                throw new Error("Please Login to add employees");  
            }
            console.log(req.user);
            const employee=await Employee.findByIdAndUpdate(req.params.id,req.body);
            res.json(employee);
        } catch (error) {
            throw new Error(error);
        }
    }
)
const deleteEmployee=asyncHandler(
    async(req,res)=>{
        try {
            console.log(req.user);
            const employee=await Employee.findByIdAndDelete(req.params.id);
            await Manager.findByIdAndUpdate(req.user._id,{$pull:{employees:employee.id}});
            res.json(employee);
        } catch (error) {
            res.json(error);
        }
    }
);
const singleEmployee=asyncHandler(
    async(req,res)=>{
        try {
            const employee=await Employee.findById(req.params.id);
            res.json(employee);
        } catch (error) {
            res.json(error);
        }
    }
)
module.exports ={addEmployee,updateEmployee,deleteEmployee,singleEmployee};