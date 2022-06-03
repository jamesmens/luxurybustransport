import React,{useEffect,useState} from "react"
import { Form, useFormik,yupToFormErrors } from "formik"

import {useSelector,useDispatch} from "react-redux"
import * as Yup from "yup"
import { TextField } from "@mui/material"
import { Button } from "react-bootstrap"
import {Getmsg,Contact_msg} from "../../store/actions/comment_action"
import { Refundtickets } from "../../store/actions/drivers_action"
import { ShowToast } from "./tools"


const Refund=()=>{
  const notification=useSelector((state)=>state.Notification)
  const account = useSelector((state) => state.User)
  const dispatch=useDispatch()
  const all_msg=useSelector((state)=>state.Comments)
// useEffect=(()=>{
//   dispatch(Getmsg())

// },[all_msg])

  const [loading,setload]=useState(null)



  const Formik=useFormik({
    initialValues:{
      busNumber:"",
     
      message:"",
      bus:"",
      _id:""



    },
    validationSchema:Yup.object({

busNumber:Yup.string().required("ticket number require"),
bus:Yup.string().required("ticket number require"),
_id:Yup.string().required("ticket number require"),
message:Yup.string().required("please enter reasons for cancellation")
.max(500,"sorry message too long")

    })
    ,onSubmit:(value,{reset})=>{
    
      dispatch(Refundtickets(account.data._id,value))
setTimeout(()=>{
  if(notification && notification.msg==="good!, you well hear from Us after review"){
    ShowToast("SUCCESS","nice,you well hear from Us after review ")

  }
  
},3000)

    }
  })

  const ErrorHelper=(formik,value)=>({
    error:formik.errors[value] && formik.touched[value] ? true  :false,
    helperText: formik.errors[value]  && formik.touched[value] ? formik.errors[value]:null
  })
  return(<div className="contact_main">

<div className="contact_page">
<h1 style={{fontWeight:"bold"}}>Ticket Refund forms</h1>
<form style={{width:"60%"}} onSubmit={Formik.handleSubmit}>

  <div className="contact_field">

    <TextField style={{width:"100%"}}
    name="busNumber"
    label="Ticket number"
  variant="outlined"
  {...Formik.getFieldProps("busNumber")}
  {...ErrorHelper(Formik,"busNumber")}>
      



    </TextField>
  </div>
  
  <div className="contact_field">

    <TextField style={{width:"100%"}}
    name="_id"
    label="Ticket Id"
  variant="outlined"
  {...Formik.getFieldProps("_id")}
  {...ErrorHelper(Formik,"_id")}>
      



    </TextField>
  </div>


  <div className="contact_field">

    <TextField style={{width:"100%"}}
    name="bus"
    label="Bus number"
  variant="outlined"
  {...Formik.getFieldProps("bus")}
  {...ErrorHelper(Formik,"bus")}>
      



    </TextField>
  </div>
  
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
<Button style={{width:"100%", color:"blue", backgroundColor:"ButtonShadow"}} variant="outlined" color="secondary" type="submit">Send message</Button>
  

  </form>
  
  </div>




  </div>)
}


export default Refund