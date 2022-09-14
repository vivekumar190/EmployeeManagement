const express=require('express');
const app= express();
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/managerroutes');
const cors=require('cors');
const { errorHandler } = require('./errorMiddleware/errorHandler');

// connecting to database
mongoose.connect('mongodb://localhost:27017/TestTask',{useUnifiedTopology:true,
    useNewUrlParser:true,
           },
        err=>{
        if(err)throw err;
        console.log('Database connected');
});

app.use(express.json());
//using cors
app.use(cors());
app.use('/api/manager',userRoutes);
app.use('/api/employee',employeeRoutes);
//error handling
app.use(errorHandler);

app.listen(8080);