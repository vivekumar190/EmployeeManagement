import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Row, Col, Tooltip, User, Text ,Button, Grid, Spacer,Modal,useModal,Input,Loading,Popover} from "@nextui-org/react";
import { Link, Navigate } from "react-router-dom";
import Moment from 'react-moment';
import { addEmployee, dashboardManager, deleteEmployee, getEmployee, logoutManager, updateEmployee } from '../redux/slices/managerSlices';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const formSchema=Yup.object({
  firstName:Yup.string().required('first name required'),
  lastName:Yup.string().required('last name required'),
  city:Yup.string().required('city required'),
  mobile:Yup.string().required('password is definetly required'),
  dob:Yup.string().required('dob required'),
  address:Yup.string().required('address required'),
  empId:Yup.string().required('comapny name required')
});
const updateformSchema=Yup.object({
  firstName:Yup.string().required('first name required'),
  lastName:Yup.string().required('last name required'),
  city:Yup.string().required('city required'),
  mobile:Yup.string().required('password is definetly required'),
  dob:Yup.string().required('dob required'),
  address:Yup.string().required('address required'),
  empId:Yup.string().required('comapny name required')
});



const Home = () => {
  const dispatch=useDispatch();


      const user=useSelector(state=>state?.users);
      const {userAuth,loading,employeeAdded,employeeDeleted,appErr,serverErr,employeeDetails,employeeUpdated}=user;
      const emplyeedata=useSelector(state=>state?.users?.dashboardData);
      // const {loading,appErr,serverErr,employees}=emplyeedata;
      useEffect(()=>{
        dispatch(dashboardManager());
        },[dispatch,employeeAdded,employeeDeleted,employeeUpdated,employeeDetails]);

// add new employee MODAL
      const { setVisible, bindings } = useModal();
const clickhandler=()=>{
  setVisible(true);
}
// UPDATE EMPLOYEE MODAL
const [visible, setVisibles] = React.useState(false);
const handler = () => setVisibles(true);
const closeHandler = () => {
  setVisibles(false);
  console.log("closed");
};
      const formik=useFormik({
        initialValues:{
          firstName:'',
          lastName:'',
          city:'',
          mobile:'',
          dob:'',
          address:'',
          empId:''
        },
        onSubmit:(values)=>{
        console.log(values);
        dispatch(addEmployee(values));
        },
        validationSchema:formSchema
});
const updateformik=useFormik({
  enableReinitialize: true,
  initialValues:{
    firstName:employeeDetails?.firstName,
    lastName:employeeDetails?.lastName,
    city:employeeDetails?.city,
    mobile:employeeDetails?.mobile,
    dob:employeeDetails?.dob,
    address:employeeDetails?.address,
    empId:employeeDetails?.empId,
  },
  onSubmit:(values)=>{
 dispatch(updateEmployee({data:values,id:employeeDetails?._id}));
  ;
  },
  validationSchema:formSchema
});





if(!userAuth){
  return <Navigate to='/login'/> }


  return (
    <div class='container mx-auto px-20 place-content-center bg-grey-400'>
      
    <div class="flow-root"> 
    
    <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        Manager dashbaord
      </Text>
    <p class="float-left">  <Text
        h1
        size={30}
        css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}
        weight="bold"
      >
       Welcome : {userAuth?.firstName+' '+ userAuth?.lastName}
      </Text> </p> 
      
      <p class="float-right"><Button shadow color="error" auto onClick={()=>dispatch(logoutManager())}>
        
        Logout </Button></p>
        <p class="float-right"> <Spacer x={1} /></p>
        <p class="float-right"><Button shadow onClick={()=>setVisible(true)} flat>Add Employee</Button> </p>
      
</div>
 <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>Mobile</Table.Column>
        <Table.Column>Joined</Table.Column>
        <Table.Column>EmployeeId</Table.Column>
        <Table.Column>Action</Table.Column>
      </Table.Header>
      <Table.Body>
        {emplyeedata?.employees?.map(employee=>{return (
             <Table.Row key={employee?.id}>
             <Table.Cell>{employee?.firstName + ' ' +employee?.lastName}</Table.Cell>
             <Table.Cell>{employee?.mobile}</Table.Cell>
             <Table.Cell><Moment format="YYYY/MM/DD">{employee?.createdAt}</Moment></Table.Cell>
             <Table.Cell>{employee?.empId}</Table.Cell>
             <Table.Cell><Grid.Container><Grid><Button color="warning" auto flat onClick={()=>(dispatch(getEmployee(employee?._id)),handler())}>Update Employee</Button></Grid><Spacer/><Grid> <Popover>
          <Popover.Trigger>
            <Button color="error" auto flat >Delete Employee</Button>
          </Popover.Trigger>
          <Popover.Content>
          <Grid.Container
      css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
    >
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row>
        <Text>
          Are you sure you want to delete this user ? By doing this, you will
          not be able to recover the data.
        </Text>
      </Row>
      <Grid.Container justify="space-between" alignContent="center">
      <Grid>
          <Text>Want to Delete Anyway</Text>
         
        
        </Grid>
        <Grid>
          <Button size="sm" shadow color="error" onClick={()=>dispatch(deleteEmployee(employee?._id))}>
            Delete 
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
          </Popover.Content>
        </Popover></Grid></Grid.Container> </Table.Cell>
           </Table.Row>
      
           )
        })}
      </Table.Body>
    </Table>
    <Modal 

        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
        <Text
        h1
        size={30}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
      Add Employees
      </Text>
        </Modal.Header>
        <Modal.Body>
        
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
          placeholder='Enter your first name'
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
        value={formik.values.mobile}
        onChange={formik.handleChange("mobile")}
        onBlur={formik.handleBlur("mobile")}
        helperText={formik.touched.mobile && formik.errors.mobile}
          clearable 
          label="Mobile"
          placeholder="Enter your mobile number"
          color="secondary"
        />
              </Grid>
              <Grid>
              <Input
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                      color="error"
                      helperText={formik.touched.city && formik.errors.city}
                      label='City'
                      placeholder="Enter City"
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
           value={formik.values.empId}
           onChange={formik.handleChange("empId")}
           onBlur={formik.handleBlur("empId")}
           helperText={formik.touched.empId && formik.errors.empId}
           clearable
           label="Employee ID"
          placeholder="Enter Address"
          color="default"
        />
              </Grid>
              <Grid>
              <Input
           value={formik.values.address}
           onChange={formik.handleChange("address")}
           onBlur={formik.handleBlur("address")}
           helperText={formik.touched.empId && formik.errors.address}
           clearable
           label="Address"
          placeholder="Enter Address"
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
                 submit
                  </Button>

                  )}
</div>
        </form>
        </Modal.Body>
        <Modal.Footer>
        {appErr|| serverErr?   <Text  color="error">{serverErr}-{appErr}</Text>:null}
        </Modal.Footer>
      </Modal>
 
      <Modal
      scroll
      width="600px"
        closeButton
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Update
            <Text b size={18}>
            Employees
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={updateformik.handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
          <Spacer y={1} />
          <Grid.Container gap={4}>
            <Grid>
            <Input
            value={updateformik.values.firstName}
            onChange={updateformik.handleChange("firstName")}
            onBlur={updateformik.handleBlur("firstName")}
            helperText={updateformik.touched.firstName && updateformik.errors.firstName}
          clearable
          label="First Name"
          placeholder=''
          color="default"
        />
            </Grid>
            <Grid>
            <Input
        value={updateformik.values.lastName}
        onChange={updateformik.handleChange("lastName")}
        onBlur={updateformik.handleBlur("lastName")}
        helperText={updateformik.touched.lastName && updateformik.errors.lastName}
           clearable
           label="Last Name"
          placeholder="Enter your last name"
          color="default"
        />
            </Grid>
            <Grid>
            <Input
        value={updateformik.values.mobile}
        onChange={updateformik.handleChange("mobile")}
        onBlur={updateformik.handleBlur("mobile")}
        helperText={updateformik.touched.mobile && updateformik.errors.mobile}
          clearable 
          label="Mobile"
          placeholder="Enter your mobile number"
          color="secondary"
        />
              </Grid>
              <Grid>
              <Input
                      value={updateformik.values.city}
                      onChange={updateformik.handleChange("city")}
                      onBlur={updateformik.handleBlur("city")}
                      color="error"
                      helperText={updateformik.touched.city && updateformik.errors.city}
                      label='City'
                      placeholder="Enter City"
                    />
              </Grid>
              <Grid>
              <Input
        value={updateformik.values.dob}
        onChange={updateformik.handleChange("dob")}
        onBlur={updateformik.handleBlur("dob")}
        helperText={updateformik.touched.dob && updateformik.errors.dob}
           clearable
           label="D.O.B"
          placeholder="Your don in DD/MM/YYYY"
          color="default"
        />
              </Grid>
              <Grid>
              <Input
             
           value={updateformik.values.empId}
           onChange={updateformik.handleChange("empId")}
           onBlur={updateformik.handleBlur("empId")}
           helperText={updateformik.touched.empId && updateformik.errors.empId}
       
           label="Employee ID"
          placeholder={employeeDetails?.empId}
          color="default"
        />
              </Grid>
              <Grid>
              <Input
           value={updateformik.values.address}
           onChange={updateformik.handleChange("address")}
           onBlur={updateformik.handleBlur("address")}
           helperText={updateformik.touched.empId && updateformik.errors.address}
           clearable
           label="Address"
          placeholder="Enter Address"
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
                 submit
                  </Button>

               )}
</div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          {appErr|| serverErr?   <Text  color="error">{serverErr}-{appErr}</Text>:null}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Home