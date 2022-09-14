import React from 'react'
import { Input, Grid,Container, Card, Row, Text ,Spacer,Button,Loading} from "@nextui-org/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginManager } from '../redux/slices/managerSlices';

const formSchema=Yup.object({
  email:Yup.string().required('email required'),
  password:Yup.string().required('password is definetly required'),
})
const Login = () => {
  const dispatch=useDispatch();
  const user=useSelector((state)=>state?.users);
  const {loading,appErr,serverErr,userAuth}=user;
  // formik
  const formik=useFormik({
    initialValues:{
      password:'',
      dob:'',
    },
    onSubmit:(values)=>{
    console.log(values);
    dispatch(loginManager(values));
    },
    validationSchema:formSchema
  });
  
if(userAuth){
  return <Navigate to='/home'/> }
  return (  
    <div class='container mx-auto px-20 place-content-center bg-grey-400'>
    <div class="">
       <Container responsive gap={0} AlignItems = 'center' css={{ mw: "1000px" }}>
    
       <Card css={{$$cardColor: '$colors$#16181A', mw: "700px" ,bw:0}}>
        <Card.Header>
        <Text
            h1
            size={60}
            
            weight="bold"
          >
    Login
          </Text>
        </Card.Header>
            <Card.Body>
              <form onSubmit={formik.handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 justify-center">
              <Spacer y={1} />
            
            
            <Spacer y={1.5} />
    
            <Input
             value={formik.values.email}
             onChange={formik.handleChange("email")}
             onBlur={formik.handleBlur("email")}
             helperText={formik.touched.email && formik.errors.email}
              clearable 
              label="Email"
              placeholder="Enter your email address"
              color="secondary"
            />
            <Spacer y={1.5} />
            <Input
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        color="error"
                        helperText={formik.touched.password && formik.errors.password}
                         
                         
                          type="password"
                          label='Password'
                          placeholder="Enter Password"
                        />
            <Spacer y={1.5} />
            <div>
          {loading ? ( <Button
                   disabled
                  >
                 <Loading type="points-opacity" color="currentColor" size="sm" />
                  </Button> ):(
                      <Button
                    type="submit"
                  >
                    Login
                  </Button>

                  )}
</div>

      
        


 

{appErr|| serverErr?   <Text  color="error">{serverErr}-{appErr}</Text>:null}
<Spacer/>
<div class="flex items-center ">
  
<Text>dont have an account</Text><Link to='/signup'> SignUp</Link>
</div>
              </form>
          
            </Card.Body>
            <Card.Footer>
             
              </Card.Footer>
            </Card>
    
       </Container>
       
      
        </div>
        </div > 
  
  )
}

export default Login