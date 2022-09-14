const express=require('express');
const auth = require('../authMiddleware/authmiddleware');
const {managerDashboard, signup, login} = require('../controllers/ManagerCtrl');
const userRoutes=express.Router();


userRoutes.post('/signup',signup);
userRoutes.post('/login',login);
userRoutes.get('/dashboard',auth,managerDashboard);
module.exports = userRoutes;