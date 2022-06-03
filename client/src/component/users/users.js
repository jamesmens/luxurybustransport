import React,{useEffect,useState} from "react"
import {useSearchParams} from "react-router-dom"
import { Form, useFormik,yupToFormErrors } from "formik"
import { useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import * as Yup from "yup"
import { TextField } from "@mui/material"
import { Button } from "react-bootstrap"

import {Getmsg,Contact_msg} from "../../store/actions/comment_action"


const Users_Account=()=>{

  const dispatch=useDispatch()
  const history=useNavigate()
  const user=useSelector((state)=>state.User)
  useEffect(()=>{
    if(user && user.auth !==true){
      history("/")


    }
    if(user && user.data.role ==="admin"){
      history("/")

    }
    if(user && user.data.role ==="driver"){
      history("/")

    }

  })
  const all_msg=useSelector((state)=>state.Comments)
// useEffect=(()=>{
//   dispatch(Getmsg())

// },[all_msg])

  const [loading,setload]=useState(null)



  const Formik=useFormik({
    initialValues:{
      firstname:"",
      email:"",
      lastname:"",
      username:"",
      password:"",
      comfirmpassword:"",
      phone:"",
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
address:Yup.string().required("address required")
.max(500,"sorry message too long")

    })
    ,onSubmit:(value,{reset})=>{
     
     


    }
  })


  const ErrorHelper=(formik,value)=>({
    error:formik.errors[value] && formik.touched[value] ? true  :false,
    helperText: formik.errors[value]  && formik.touched[value] ? formik.errors[value]:null
  })


 
  return(<div className="contact_main">
  {
loading ?
<p></p>

:
<div className="contact_page">
<div style={{fontFamily:"Fredoka", fontWeight:"bold",fontSize:"30px",marginBottom:"30px"}}>Apply to be part of luxurytransport</div>
<form onSubmit={Formik.handleSubmit}>

  <div className="contact_field">

    <TextField style={{width:"100%"}}
    name="email"
    label="Email"
  variant="outlined"
  {...Formik.getFieldProps("email")}
  {...ErrorHelper(Formik,"email")}
  >
      



    </TextField>
  </div>
  <div className="contact_field">

    <TextField style={{width:"100%"}}
    name="firstname"
    label="Firstname"
  variant="outlined"
  {...Formik.getFieldProps("firstname")}
  {...ErrorHelper(Formik,"firstname")}>
      



    </TextField>
  </div>
  <div className="contact_field">

    <TextField style={{width:"100%"}}
    name="lastname"
    label="Lastname"
  variant="outlined"
  {...Formik.getFieldProps("lastname")}
  {...ErrorHelper(Formik,"lastname")}>
      



    </TextField>
  </div>
  <div className="contact_field">

<TextField style={{width:"100%"}}
name="username"
label="Username"
variant="outlined"
{...Formik.getFieldProps("username")}
{...ErrorHelper(Formik,"username")}>
  



</TextField>
</div>
<div className="contact_field">

<TextField style={{width:"100%"}}
name="password"
label="password"
variant="outlined"
{...Formik.getFieldProps("password")}
{...ErrorHelper(Formik,"password")}>
  



</TextField>
</div>
<div className="contact_field">

<TextField style={{width:"100%"}}
name="comfirmpassword"
label="comfirmpassword"
variant="outlined"
{...Formik.getFieldProps("comfirmpassword")}
{...ErrorHelper(Formik,"comfirmpassword")}>
  



</TextField>
</div>
<div className="contact_field">

<TextField style={{width:"100%"}}
name="phone"
label="phone"
variant="outlined"
{...Formik.getFieldProps("phone")}
{...ErrorHelper(Formik,"phone")}>
  



</TextField>
</div>
<div className="contact_field">

<TextField style={{width:"100%"}}
name="address"
label="address"
variant="outlined"
{...Formik.getFieldProps("address")}
{...ErrorHelper(Formik,"address")}>
  



</TextField>
</div>
  
  
<Button style={{width:"100%", color:"blue", backgroundColor:"ButtonShadow"}} variant="outlined" color="secondary" type="submit">Apply</Button>
  

  </form>
  
  </div>


  }








  </div>)
}



export default Users_Account