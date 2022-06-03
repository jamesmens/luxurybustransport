import React,{useEffect,useState} from "react"
import { Form, useFormik,yupToFormErrors } from "formik"

import {useSelector,useDispatch} from "react-redux"
import * as Yup from "yup"
import { TextField } from "@mui/material"
import { Button } from "react-bootstrap"
import {Getmsg,Contact_msg} from "../../store/actions/comment_action"
 

const Messages=()=>{

  const dispatch=useDispatch()
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
      message:""



    },
    validationSchema:Yup.object({
email:Yup.string().required("email required")
.email("sorry, email not valid"),
firstname:Yup.string().required("firstname require"),
lastname:Yup.string().required("lastname is required"),
message:Yup.string().required("please say something")
.max(500,"sorry message too long")

    })
    ,onSubmit:(value,{reset})=>{
     
      dispatch(Contact_msg(value))


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
<h1 >Message luxurytransport</h1>
<form style={{width:"100%"}} onSubmit={Formik.handleSubmit}>


  
  <div className="contact_field">

    <TextField  style={{width:"100%"}}
    name="message"
    label="Message"
  variant="outlined"
  rows={4}
  multiline

  
  {...Formik.getFieldProps("message")}
  {...ErrorHelper(Formik,"message")}
>
      

    </TextField>
  </div>
<Button style={{width:"100%", color:"blue", backgroundColor:"ButtonShadow"}} variant="outlined" color="secondary" type="submit">Send our message</Button>
  

  </form>
  
  </div>


  }








  </div>)
}


export default Messages