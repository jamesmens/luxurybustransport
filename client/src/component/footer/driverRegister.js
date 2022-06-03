
import React,{useEffect,useState} from "react"
import {useSearchParams} from "react-router-dom"
import {useFormik } from "formik"
import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import * as Yup from "yup"
import { TextField } from "@mui/material"
import { Button } from "react-bootstrap"
import { ShowToast } from "../ultils/tools"
import { Driverapp } from "../../store/actions/drivers_action"
import { notify_remove } from "../../store/actions"



const DriverRegistration=()=>{

const dispatch=useDispatch()
const history=useNavigate()

const notification=useSelector((state)=>state.Notification)
const [state,setstate]=useState(false)

  const Formik=useFormik({
    initialValues:{
      firstname:"",
      email:"",
      lastname:"",
      username:"",
      password:"",
      comfirmpassword:"",
      phone:"",
      age:"",
      address:"",
      about_me:""




    },
    validationSchema:Yup.object({
email:Yup.string().required("email required")
.email("sorry, email not valid"),
firstname:Yup.string().required("firstname require"),
lastname:Yup.string().required("lastname is required"),
username:Yup.string().required("username is require"),
password:Yup.string().required("password is require"),
comfirmpassword:Yup.string().required("enter password again"),
phone:Yup.number().required("number is require").min(9,"number must not be less then 9"),
address:Yup.string().required("address required"),
age:Yup.string().required("age required"),
about_me:Yup.string().required("Please field required")
.max(500,"sorry message too long")

    })
    ,onSubmit:(value,{reset})=>{
     
   
    dispatch( Driverapp(value))
   


    }
  })
  useEffect(()=>{
    if(notification && notification.success){
      setstate(true)
     setTimeout(()=>{
      ShowToast("SUCCESS","application sent !")
     },2000)
   
    }
    if(notification && notification.error){
      setTimeout(()=>{
        ShowToast("SUCCESS",notification.msg)
       },2000)
      setstate(false)
      dispatch(notify_remove())

    }
  })


  const ErrorHelper=(formik,value)=>({
    error:formik.errors[value] && formik.touched[value] ? true  :false,
    helperText: formik.errors[value]  && formik.touched[value] ? formik.errors[value]:null
  })


 
  return(<div className="appicationbox">
 {state ? <div style={{height:"450px" ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}> 
  
   <p style={{fontFamily:"frekoda",padding:"20px",fontWeight:"bold",fontSize:"20px"}}>nice, please check your Inbox to verify your account </p>
 <p style={{padding:"5px",backgroundColor:"blue",cursor:"pointer",color:"white",fontFamily:"frekoda"}} onClick={()=>{ 
   dispatch(notify_remove())
   history("/")}}>Continue</p>
 </div> :
 <form  className="registerDriver" onSubmit={Formik.handleSubmit}>
 <div className="driver_form_h"><h1 style={{fontFamily:"frekoda"}}>Bus driver application form</h1></div>

<div className="regDriver">
<div className="reg_box">

<TextField 
name="email"
label="Email"
variant="outlined"
{...Formik.getFieldProps("email")}
{...ErrorHelper(Formik,"email")}
>




</TextField>
</div>
<div className="reg_box">

<TextField
name="firstname"
label="Firstname"
variant="outlined"
{...Formik.getFieldProps("firstname")}
{...ErrorHelper(Formik,"firstname")}>




</TextField>
</div>
</div>
<div className="regDriver">
<div className="reg_box">

<TextField 
name="lastname"
label="Lastname"
variant="outlined"
{...Formik.getFieldProps("lastname")}
{...ErrorHelper(Formik,"lastname")}>




</TextField>
</div>




<div className="reg_box">

<TextField 
name="username"
label="Username"
variant="outlined"
{...Formik.getFieldProps("username")}
{...ErrorHelper(Formik,"username")}>




</TextField>
</div>
</div>
<div className="regDriver">
<div className="reg_box">

<TextField 
name="password"
label="password"
variant="outlined"
{...Formik.getFieldProps("password")}
{...ErrorHelper(Formik,"password")}>




</TextField>
</div>
<div className="reg_box">

<TextField 
name="comfirmpassword"
label="comfirmpassword"
variant="outlined"
{...Formik.getFieldProps("comfirmpassword")}
{...ErrorHelper(Formik,"comfirmpassword")}>




</TextField>
</div>
</div>

<div className="regDriver">

<div className="reg_box">

<TextField 
name="phone"
label="phone"
variant="outlined"
{...Formik.getFieldProps("phone")}
{...ErrorHelper(Formik,"phone")}>




</TextField>
</div>
<div className="reg_box">

<TextField 
name="age"
label="age"
variant="outlined"
{...Formik.getFieldProps("age")}
{...ErrorHelper(Formik,"age")}>




</TextField>
</div>
</div>
<div className="regDriver">
<div className="reg_box">

<TextField 
name="address"
label="address"
variant="outlined"
{...Formik.getFieldProps("address")}
{...ErrorHelper(Formik,"address")}>




</TextField>
</div>

</div>

<div className="reg_box" style={{width:"100%",backgroundColor:"red" }}   >
<TextField style={{width:"100%",backgroundColor:"white"}} 
name="about_me"
label="Brief us about yourself and qualifications"
variant="outlined"
minrows={50}
multiline


{...Formik.getFieldProps("about_me")}
{...ErrorHelper(Formik,"about_me")}

/>
</div>




<Button type="submit" style={{width:"100%",margin:"20px"}}>Apply</Button>

</form>

 }

  </div>)
}



export default DriverRegistration