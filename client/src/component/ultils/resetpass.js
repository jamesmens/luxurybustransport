import React,{useEffect,useState} from "react"
import { Form, useFormik,yupToFormErrors } from "formik"

import {useSelector,useDispatch} from "react-redux"
import * as Yup from "yup"
import { TextField } from "@mui/material"
import { Button } from "react-bootstrap"
import {Getmsg,Contact_msg} from "../../store/actions/comment_action"
import { ChangeUserpassword } from "../../store/actions/users_action"
import { ShowToast } from "./tools"
import { notify_remove } from "../../store/actions"



const Resetpassword=(props)=>{
  
  


  const [loading,setload]=useState(null)



  const Formik=useFormik({
    initialValues:{
      password:"",
      newpassword:"",
   
     



    },
    validationSchema:Yup.object({

        password:Yup.string().required("old password required !"),
        newpassword:Yup.string().required("new password is required !")
        


    })
    ,onSubmit:(value,{reset})=>{
   


    }
  })
  const [value,setvalue]=useState("")
  const [check,setcheck]=useState(false)

const Pass=Formik.values.newpassword;
  const dispatch=useDispatch()
  const all_msg=useSelector((state)=>state.Comments)
  const account = useSelector((state) => state.User)
  const notification=useSelector((state)=>state.Notification)
  useEffect(()=>{
  
    if( (value !=="" || Pass !=="") &&(value===Pass && Pass.length >7) ){
      setcheck(false)
    }
    setTimeout(()=>{
     
      if(notification && notification.success){
        ShowToast("SUCCESS",notification.msg)
        dispatch(notify_remove())
        props.option("default")
      }
      if(notification && notification.error){
        ShowToast("ERROR",notification.msg)
        dispatch(notify_remove())
      }
     
    },2000)
    
  })
  const ErrorHelper=(formik,value)=>({
    error:formik.errors[value] && formik.touched[value] ? true  :false,
    helperText: formik.errors[value]  && formik.touched[value] ? formik.errors[value]:null
  })
  return(<div className="contact_main">


<div className="contact_page">
<h1 style={{fontWeight:"bold"}}>Password reset  form</h1>
<form style={{width:"70%"}} onSubmit={Formik.handleSubmit}>

  <div className="contact_field">

    <TextField style={{width:"100%"}}
    name="password"
    label="password"
  variant="outlined"
  {...Formik.getFieldProps("password")}
  {...ErrorHelper(Formik,"password")}
  >
      



    </TextField>
  </div>
  <div className="contact_field">

    <TextField style={{width:"100%"}}
    name="newpassword"
    label="new password"
  variant="outlined"
  {...Formik.getFieldProps("newpassword")}
  {...ErrorHelper(Formik,"newpassword")}>
      



    </TextField>
  </div>
  <div className="contact_field">

    <TextField style={{width:"100%"}}
   
    label="Comfirm password"
  variant="outlined"
  onChange={(e)=>{
    setvalue(e.target.value)
    if(value ===Pass){
      setcheck(false)
    }
  
   
  }}
 >
      

    </TextField>
  </div>
  

<div style={{margin:"20px"}}>
{
  check ? <div>
  {(Pass.length<8 && (Pass !=="" && value !=="")) ?<span className="mismatchError">Please password should not be less then eight(8) in length</span>:<p>{ value==="" && Pass===""?<span className="mismatchError">Sorry password field can not be empty !!</span>: <span className="mismatchError">password mismatch, check well</span>}</p>}</div> :null
}
 </div>
  

<Button 
onClick={()=>{
  if(value !==Pass || Pass ==="" || value==="" || Pass.length <8 ){
    setcheck(true)
  }
  if((value !=="" && Pass !=="") &&(value===Pass &&(Pass.length>7) )){

    dispatch(ChangeUserpassword(account.data._id,Formik.values))
 
  
  }
}}
 style={{width:"100%", color:"blue", backgroundColor:"ButtonShadow"}} variant="outlined" color="secondary">Changedd password</Button>
  

  </form>
  
  </div>










  </div>)
}


export default Resetpassword