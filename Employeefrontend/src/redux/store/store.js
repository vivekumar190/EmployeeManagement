import {configureStore} from '@reduxjs/toolkit';
import managerReducers from '../slices/managerSlices';

const store=configureStore({
    reducer:{
     users:managerReducers
    }
})
export default store;