import React,{useEffect,useState} from "react"
import {useSearchParams} from "react-router-dom"
import {useFormik } from "formik"

import {useSelector,useDispatch} from "react-redux"
import * as Yup from "yup"
import { TextField } from "@mui/material"
import { Button } from "react-bootstrap"
import {SignAccount} from "../../store/actions/users_action"
import { Passwordforgot } from "../../store/actions/drivers_action"

const Account_reset=(props)=>{
const dispatch=useDispatch()

const [forgotten,setfor]=useState("false")
const Forgot=useFormik({
  initialValues:{
   
    email:""

  },
  validationSchema:Yup.object({
email:Yup.string().required("email required")
.email("sorry, email not valid"),

  })
  ,onSubmit:(value,{reset})=>{
  
     dispatch(Passwordforgot(value))
    


  }
})


const ErrorHp=(formik,value)=>({
  error:formik.errors[value] && formik.touched[value] ? true  :false,
  helperText: formik.errors[value]  && formik.touched[value] ? formik.errors[value]:null
})





 
  return(<div>
 
    <form onSubmit={Forgot.handleSubmit}>
      <div className="contact_field" >

<TextField style={{width:"150%",margin:"0 10% 0 0"}}
name="email"
label="Email"
variant="outlined"
{...Forgot.getFieldProps("email")}
{...ErrorHp(Forgot,"email")}
>
  



</TextField>
</div>
<Button type="submit">Reset password</Button>
    </form>: 
   
  

  </div>)
}



export default Account_reset