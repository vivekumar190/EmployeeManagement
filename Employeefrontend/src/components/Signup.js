import React from 'react'
import { Input, Grid,Container, Card, Row, Text ,Spacer,Button,Loading} from "@nextui-org/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerManager } from '../redux/slices/managerSlices';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const formSchema=Yup.object({
  firstName:Yup.string().required('first name required'),
  lastName:Yup.string().required('last name required'),
  email:Yup.string().required('email required'),
  password:Yup.string().required('password is definetly required'),
  dob:Yup.string().required('dob required'),
  address:Yup.string().required('address required'),
  company:Yup.string().required('comapny name required')
})

const Signup = () => {
  const dispatch=useDispatch();
  const user=useSelector((state)=>state?.users);
  const {loading,appErr,serverErr,registered}=user;
  // formik
  const formik=useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      dob:'',
      address:'',
      company:''
    },
    onSubmit:(values)=>{
    console.log(values);
    dispatch(registerManager(values));
    },
    validationSchema:formSchema
  });
  if(registered){
    return <Navigate to='/login'/> }
  return (
    <div class='container mx-auto px-10'>
 <div class=" md:mx-auto">
   <Container responsive gap={0} AlignItems = 'center' css={{ mw: "1000px" }}>
   
   <Card css={{$$cardColor: '$colors$#16181A', mw: "700px" ,bw:0}}>
    <Card.Header>
    <Text
        h1
        size={60}
        css={{
            textGradient: "45deg, $purple600 -20%, $pink600 100%",
          }}
          weight="bold"
      >
   Signup
      </Text>
     
    </Card.Header>
        <Card.Body >
        <div class='w-full rounded-full mx-auto'>
          <form onSubmit={formik.handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
          <Spacer y={1} />
          <Grid.Container gap={4}>
            <Grid>
            <Input
            value={formik.values.firstName}
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            helperText={formik.touched.firstName && formik.errors.firstName}
          clearable
          label="First Name"
          placeholder="enter your first name"
          color="default"
        />
            </Grid>
            <Grid>
            <Input
        value={formik.values.lastName}
        onChange={formik.handleChange("lastName")}
        onBlur={formik.handleBlur("lastName")}
        helperText={formik.touched.lastName && formik.errors.lastName}
           clearable
           label="Last Name"
          placeholder="Enter your last name"
          color="default"
        />
            </Grid>
            <Grid>
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
              </Grid>
              <Grid>
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
              </Grid>
              <Grid>
              <Input
        value={formik.values.dob}
        onChange={formik.handleChange("dob")}
        onBlur={formik.handleBlur("dob")}
        helperText={formik.touched.dob && formik.errors.dob}
           clearable
           label="D.O.B"
          placeholder="Your don in DD/MM/YYYY"
          color="default"
        />
              </Grid>
              <Grid>
              <Input
           value={formik.values.address}
           onChange={formik.handleChange("address")}
           onBlur={formik.handleBlur("address")}
           helperText={formik.touched.address && formik.errors.address}
           clearable
           label="Address"
          placeholder="Enter Address"
          color="default"
        />
              </Grid>
              <Grid>
              <Input
          value={formik.values.company}
          onChange={formik.handleChange("company")}
          onBlur={formik.handleBlur("company")}
          helperText={formik.touched.company && formik.errors.company}
           clearable
           label="Company"
          placeholder="Enter Company"
          color="default"
        />
              </Grid>



          </Grid.Container>
       
          <div>
          {loading ? ( <Button
                   disabled
                  >
                 <Loading type="points-opacity" color="currentColor" size="sm" />
                  </Button> ):(
                      <Button
                    type="submit"
                  >
                    Register
                  </Button>

                  )}
</div>

      
        


 

{appErr|| serverErr?   <Text  color="error">{serverErr}-{appErr}</Text>:null}
        </form>
        </div>
        </Card.Body>
        </Card>

   </Container>
   
  
    </div>

    </div>

  )
}

export default Signup