
import { NextUIProvider } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes ,Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  const user=useSelector(state=>state?.users);
  const {userAuth} = user;
  return (
    <NextUIProvider>
  
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
      <Route path='/' element={userAuth? <Home/>:<Navigate to='/login'/>}></Route>
    </Routes>
    </BrowserRouter>
    </NextUIProvider>
  );
}

export default App;
