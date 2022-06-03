import React,{useEffect,useState} from "react"
import {useSearchParams} from "react-router-dom"
import {useFormik } from "formik"
import {RegisterU} from "../../store/actions/users_action"
import {useSelector,useDispatch} from "react-redux"
import * as Yup from "yup"
import { TextField } from "@mui/material"
import { Button } from "react-bootstrap"
import { ShowToast } from "./tools"


const Register=()=>{

const dispatch=useDispatch()

const notification=useSelector((state)=>state.Notification)

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
      address:""




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
age:Yup.string().required("age required")
.max(500,"sorry message too long")

    })
    
  })

  const [check,setcheck]=useState(false)

const Pass=Formik.values.password;
const val=Formik.values.comfirmpassword;
  const ErrorHelper=(formik,value)=>({
    error:formik.errors[value] && formik.touched[value] ? true  :false,
    helperText: formik.errors[value]  && formik.touched[value] ? formik.errors[value]:null
  })

  useEffect(()=>{
    if( (val !=="" || Pass !=="") &&(val===Pass && Pass.length >7) ){
      setcheck(false)
    }
  })


 
  return(<>
 
<form onSubmit={Formik.handleSubmit}>
<div className="registerUser" >
<div className="reg">
<div className="contact_field">

<TextField 
name="email"
label="Email"
variant="outlined"
{...Formik.getFieldProps("email")}
{...ErrorHelper(Formik,"email")}
>
  



</TextField>
</div>
<div className="contact_field">

<TextField
name="firstname"
label="Firstname"
variant="outlined"
{...Formik.getFieldProps("firstname")}
{...ErrorHelper(Formik,"firstname")}>
  



</TextField>
</div>
<div className="contact_field">

<TextField 
name="lastname"
label="Lastname"
variant="outlined"
{...Formik.getFieldProps("lastname")}
{...ErrorHelper(Formik,"lastname")}>
  



</TextField>
</div>


</div>
<div className="reg">
<div className="contact_field">

<TextField 
name="username"
label="Username"
variant="outlined"
{...Formik.getFieldProps("username")}
{...ErrorHelper(Formik,"username")}>




</TextField>
</div>
<div className="contact_field">

<TextField 
name="password"
label="password"
variant="outlined"
{...Formik.getFieldProps("password")}
{...ErrorHelper(Formik,"password")}>




</TextField>
</div>
<div className="contact_field">

<TextField 

label="comfirmpassword"
variant="outlined"
onChange={()=>{
  
  if(val ===Pass){
    setcheck(false)
  }

 
}}


{...Formik.getFieldProps("comfirmpassword")}
{...ErrorHelper(Formik,"comfirmpassword")}>
  



</TextField>
</div>
</div>


<div className="reg">

<div className="contact_field">

<TextField 
name="phone"
label="phone"
variant="outlined"
{...Formik.getFieldProps("phone")}
{...ErrorHelper(Formik,"phone")}>
  



</TextField>
</div>
<div className="contact_field">

<TextField 
name="age"
label="age"
variant="outlined"
{...Formik.getFieldProps("age")}
{...ErrorHelper(Formik,"age")}>
  



</TextField>
</div>
  
<div className="contact_field">

<TextField 
name="address"
label="address"
variant="outlined"
{...Formik.getFieldProps("address")}
{...ErrorHelper(Formik,"address")}>
  



</TextField>
</div>
</div>

</div>
<div style={{margin:"20px" ,display:"flex",justifyContent:"center",width:"100%"}}>
{
  check ? <div>
  {(Pass.length<8 && (Pass !=="" && val !=="")) ?<span className="mismatchError">Please password should not be less then eight in length</span>:<p>{ val==="" && Pass===""?<span className="mismatchError">Sorry password field can not be empty !!</span>: <span className="mismatchError">password mismatch, check well</span>}</p>}</div> :null
}
 </div>
  <Button 
  onClick={()=>{
  
  
   if(val !==Pass || Pass ==="" || val==="" || Pass.length <8 ){
    setcheck(true)
  }
    if((val !=="" && Pass !=="") &&(val===Pass &&(Pass.length>7) )){
  
      dispatch(RegisterU(Formik.values))
   
    
    }
  }}
  style={{width:"100%"}}>Register</Button>
  
  </form>
 
  </>)
}



export default Register