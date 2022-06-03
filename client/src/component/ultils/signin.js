import React,{useEffect,useState} from "react"
import {useSearchParams} from "react-router-dom"
import {useFormik } from "formik"

import {useSelector,useDispatch} from "react-redux"
import * as Yup from "yup"
import { TextField } from "@mui/material"
import { Button } from "react-bootstrap"
import {SignAccount} from "../../store/actions/users_action"

const SignIn=()=>{
const dispatch=useDispatch()


  const Formik=useFormik({
    initialValues:{
     
      email:"",
     
      password:""
     




    },
    validationSchema:Yup.object({
email:Yup.string().required("email required")
.email("sorry, email not valid"),

password:Yup.string().required("password is require")


    })
    ,onSubmit:(value,{reset})=>{
     
      dispatch(SignAccount(value))
      


    }
  })


  const ErrorHelper=(formik,value)=>({
    error:formik.errors[value] && formik.touched[value] ? true  :false,
    helperText: formik.errors[value]  && formik.touched[value] ? formik.errors[value]:null
  })


 
  return(<>
 
<form onSubmit={Formik.handleSubmit}>


<div className="contact_field" >

<TextField style={{width:"150%",margin:"0 10% 0 0"}}
name="email"
label="Email"
variant="outlined"
{...Formik.getFieldProps("email")}
{...ErrorHelper(Formik,"email")}
>
  



</TextField>
</div>

<div  className="contact_field">

<TextField style={{width:"150%"}}
name="password"
label="password"
variant="outlined"
{...Formik.getFieldProps("password")}
{...ErrorHelper(Formik,"password")}>




</TextField>

</div>

  <Button type="submit" style={{width:"100%",margin:"20px"}}>Sign In</Button>
  

  </form>
 
  </>)
}



export default SignIn