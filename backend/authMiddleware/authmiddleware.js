const Manager = require('../models/Manager');
const jwt=require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const auth= asyncHandler(
    async(req,res,next)=>{
        if(req?.headers?.authorization?.startsWith('Bearer')){
        const token=req?.headers?.authorization?.split(' ')[1];
        const verify=await jwt.verify(token,'SecretKey');
        const  user=await Manager.findById(verify?.id);
        req.user=user;
        next();
        }
else {
    throw new Error('Invalid token');
}
}
)
module.exports=auth;