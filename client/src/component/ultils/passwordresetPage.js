import React,{useEffect,useRef,useState} from "react"
import {CreateUser} from "../../store/actions/users_action"
import {useSearchParams} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {Button} from "react-bootstrap"
import * as Yup from "yup"
import { TextField } from "@mui/material"


import {useFormik } from "formik"
import { Verifypassword } from "../../store/actions/drivers_action"
import { ShowToast } from "./tools"
import { notify_remove } from "../../store/actions"
const ForgotpassChange=()=>{



    const [searchParams] = useSearchParams();
    const token=searchParams.get("t")
    const dispatch=useDispatch()
    const notification=useSelector((state)=>state.Notification)
    const userDetail=useSelector((state)=>state.Users)
    const Formik=useFormik({
        initialValues:{
         
          
         
          password:"",
          t:`${token}`
        
         
    
    
    
    
        },
        validationSchema:Yup.object({
   
    
    password:Yup.string().required("old password is require"),
    
    
        })
       
      })

    const [value,setvalue]=useState("")
    const [check,setcheck]=useState(false)
const history=useNavigate()
  const Pass=Formik.values.password;
useEffect(()=>{
  
  if( (value !=="" || Pass !=="") &&(value===Pass && Pass.length >7) ){
    setcheck(false)
  }
  setTimeout(()=>{
    ShowToast("SUCCESS",notification.msg)
    
   
  },2000)
  
})
      const ErrorHelper=(formik,value)=>({
        error:formik.errors[value] && formik.touched[value] ? true  :false,
        helperText: formik.errors[value]  && formik.touched[value] ? formik.errors[value]:null
      })
    
    
     
    
    return(<div 
    className="VerifyPage">
    <div >
        <h1>Welcome to Luxury transport</h1>
    
       { notification && notification.success ? 
      <div style={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center"}}>
      <div style={{fontFamily:"frekoda", fontWeight:"bold"}}>Congrats,account password successfully reset !</div>
      <Button onClick={()=>{
        if(notification && notification.msg !=""){
          dispatch(notify_remove())
          history("/")
        }
      }}  >Home</Button>
    
      </div>
       :
       <div>{ notification && notification.msg==="error"?
       <p>oops !! something went wrong</p>  :
       <> <p>please fill the form to continue</p>
          <form onSubmit={Formik.handleSubmit}>


<div className="contact_field" >

<TextField style={{width:"100%",margin:"0 10% 0 0"}}
name="password"
label="New password"
variant="outlined"

{...Formik.getFieldProps("password")}
{...ErrorHelper(Formik,"password")}
>
  



</TextField>
</div>

<div  className="contact_field">

<TextField style={{width:"100%"}}
onChange={(e)=>{
  setvalue(e.target.value)
  if(value ===Pass){
    setcheck(false)
  }

 
}}
label="Comfirm password"
variant="outlined"

>
</TextField>


</div>
<div style={{margin:"20px"}}>
{
  check ? <div>
  {(Pass.length<8 && (Pass !=="" && value !=="")) ?<span className="mismatchError">Please password should not be less then eight(8) in length</span>:<p>{ value==="" && Pass===""?<span className="mismatchError">Sorry password field can not be empty !!</span>: <span className="mismatchError">password mismatch, check well</span>}</p>}</div> :null
}
 </div>

<Button onClick={()=>{
  if(value !==Pass || Pass ==="" || value==="" || Pass.length <8 ){
    setcheck(true)
  }
  if((value !=="" && Pass !=="") &&(value===Pass &&(Pass.length>7) )){
   
    dispatch(Verifypassword(Formik.values))
  }
}} style={{width:"100%"}}>Change Password</Button>


 
  
  </form></>}
              
       </div>
       }
       
    </div>
    </div>)

    }

export default ForgotpassChange