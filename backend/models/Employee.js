const mongoose = require('mongoose');

const employeeSchema=new mongoose.Schema({ 
empId:{
      type:'String',
      required:true,
    },
firstName:{
        type:'String',
    required:true
    },
lastName:{
    type:'String',
    required:true
},
address:{
    type:'String',
    required:true
},
dob:{
    type:'String',
    required:true
},
city:{
    type:'String',
    required:true
},
mobile:{
    type:'String',
    required:true
},
},{timestamps:true});
const Employee=mongoose.model('Employee',employeeSchema);
module.exports = Employee;