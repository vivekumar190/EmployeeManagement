import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
//register action

export const registerManager=createAsyncThunk('manager/register',async(user,{rejectWithValue,getState,dispatch})=>{

try {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const {data} =await axios.post('http://localhost:8080/api/manager/signup',user,config);
    return data;
} catch (error) {
   if(!error?.response ){
    throw error;
   } 
   return rejectWithValue(error?.response.data);
}
});
//login action


export const loginManager=createAsyncThunk('manager/login',async(userCredentials,{rejectWithValue,getState,dispatch})=>{

    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const {data} =await axios.post('http://localhost:8080/api/manager/login',userCredentials,config);
        //saving token to localstorage
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data;
    } catch (error) {
       if(!error?.response ){
        throw error;
       } 
       return rejectWithValue(error?.response.data);
    }
    });
// manager dashboard
export const dashboardManager=createAsyncThunk('manager/dashboard',async(dashboard,{rejectWithValue,getState,dispatch})=>{
    const users=getState()?.users;
    const {userAuth}=users;
    console.log(userAuth?.token);
    console.log(getState());
    const config ={
        headers:{
           Authorization:'Bearer '+userAuth?.token
        }
       }
    try {
        const {data} =await axios.get('http://localhost:8080/api/manager/dashboard',config);
        //saving token to localstorage
        return data;
    } catch (error) {
       if(!error?.response ){
        throw error;
       } 
       return rejectWithValue(error?.response.data);
    }
    });

// add Employee
export const addEmployee=createAsyncThunk('manager/add-employee',async(employee,{rejectWithValue,getState,dispatch})=>{
    const users=getState()?.users;
    const {userAuth}=users;
    console.log(userAuth?.token);
    console.log(employee);
    const config ={
        headers:{
           Authorization:'Bearer '+userAuth?.token
        }
       }
    try {
        const {data} =await axios.post('http://localhost:8080/api/employee/addEmployee',employee,config);
        //saving token to localstorage
        return data;
    } catch (error) {
       if(!error?.response ){
        throw error;
       } 
       return rejectWithValue(error?.response.data);
    }
    });
    // delete Employee
export const deleteEmployee=createAsyncThunk('manager/delete-employee',async(employeeId,{rejectWithValue,getState,dispatch})=>{
    const users=getState()?.users;
    const {userAuth}=users;
    console.log(userAuth?.token);
    console.log(employeeId);
    const config ={
        headers:{
           Authorization:'Bearer '+userAuth?.token
        }
       }
    try {
        const {data} =await axios.delete(`http://localhost:8080/api/employee/deleteEmployee/${employeeId}`,config);
      
        return data;
    } catch (error) {
       if(!error?.response ){
        throw error;
       } 
       return rejectWithValue(error?.response.data);
    }
    });
    //logout
    export const logoutManager=createAsyncThunk('manager/logout',async(employeeId,{rejectWithValue,getState,dispatch})=>{
        
        try {
           localStorage.removeItem('userInfo');
        } catch (error) {
           if(!error?.response ){
            throw error;
           } 
           return rejectWithValue(error?.response.data);
        }
        });
    


//storing userdata from localstorage
const userfromStorage=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null;


//manager slices
const managerSlices=createSlice({name:'user',initialState:{userAuth:userfromStorage},

extraReducers:(builder)=>{
    //register reducers
    builder.addCase(registerManager.pending,(state,action)=>{
        state.loading = true;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(registerManager.fulfilled,(state,action)=>{
        state.loading = false;
        state.registered=action?.payload;
        state.appErr=undefined;
        state.serverErr=undefined;
    });
    builder.addCase(registerManager.rejected,(state,action)=>{
        state.loading = false;
        console.log(action?.payload);
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
  });
  //login reducers

  builder.addCase(loginManager.pending,(state,action)=>{
    state.loading = true;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(loginManager.fulfilled,(state,action)=>{
    state.loading = false;
    state.userAuth=action?.payload;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(loginManager.rejected,(state,action)=>{
    state.loading = false;
    console.log(action?.payload);
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});
//dashbaord
builder.addCase(dashboardManager.pending,(state,action)=>{
    state.loading = true;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(dashboardManager.fulfilled,(state,action)=>{
    state.loading = false;
    state.dashboardData=action?.payload;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(dashboardManager.rejected,(state,action)=>{
    state.loading = false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});
//add Employee
builder.addCase(addEmployee.pending,(state,action)=>{
    state.loading = true;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(addEmployee.fulfilled,(state,action)=>{
    state.loading = false;
    state.employeeAdded=action?.payload;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(addEmployee.rejected,(state,action)=>{
    state.loading = false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});
//DELETE Employee
builder.addCase(deleteEmployee.pending,(state,action)=>{
    state.loading = true;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(deleteEmployee.fulfilled,(state,action)=>{
    state.loading = false;
    state.employeeDeleted=action?.payload;
    state.appErr=undefined;
    state.serverErr=undefined;
});

builder.addCase(deleteEmployee.rejected,(state,action)=>{
    state.loading = false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});
//logout 
builder.addCase(logoutManager.pending,(state,action)=>{
    state.loading = true;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(logoutManager.fulfilled,(state,action)=>{
    state.loading = false;
    state.userAuth=undefined;
    state.appErr=undefined;
    state.serverErr=undefined;
});

builder.addCase(logoutManager.rejected,(state,action)=>{
    state.loading = false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});

}
});
export default managerSlices.reducer;