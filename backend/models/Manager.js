const mongoose=require('mongoose');
const ManagerSchema=new mongoose.Schema({
email:{
        type:'String',
        required:true
    },
firstName:{
        type:'String',
    required:true
    },
lastName:{
    type:'String',
    required:true
},
password:{
    type:'String',
    required:true
},
token:{
    type:'String',  
},
address:{
    type:'String',
    required:true
},
dob:{
    type:'String',
    required:true
},
company:{
    type:'String',
    required:true
},
employees:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Employee'
    }
]
},{timeseries:true});

const Manager=mongoose.model('Manager',ManagerSchema);
module.exports = Manager;