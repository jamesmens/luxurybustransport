import React,{useEffect, useState} from "react" 
import { Form , Button} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik, FormikProvider, FieldArray } from "formik";
import {ShowToast } from "./tools"
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import {
    Divider,

    TextField,
 
    MenuItem,
  
    Select,
  } from "@mui/material";
import { Create_Component, Get_component } from "../../store/actions/components";
import { Types } from "mongoose";
import { notify_error } from "../../store/actions";
import ShowComponent from "./ShowComponent";



const Component_main =()=>{
  const history=useNavigate()
  const user=useSelector((state)=>state.User)
  useEffect(()=>{
    if(user && user.auth !==true){
      history("/")


    }
    if(user && user.data.role ==="user"){
      history("/")

    }
    if(user && user.data.role ==="driver"){
      history("/")

    }

  })
  const notification=useSelector((state)=>state.Notification)
  useEffect(()=>{
    if(notification && notification.success){
      ShowToast("SUCCESS",notification.msg)
      setTimeout(()=>{
        dispatch(notify_error())
  
      },1000)
    }

  })
  const dispatch=useDispatch()

const [Types,Settype]=useState("ok")
  const Formik=useFormik({
    
    initialValues:{
     
     type:'',
     content: ""
    

    },
    
    validationSchema:Yup.object({
content:Yup.string().required("old password is require"),


    })
   
  })


    return(<div className="Component_m">
     <form  className="add_component" onSubmit={Formik.handleSubmit}>



<div  className="contact_field">
<span style={{fontFamily:"frekoda", fontWeight:"bolder"}}>Choose Type</span>
<Select  
      name="type"
      value={Formik.values.type ?? ""}
      {...Formik.getFieldProps("type")}
       style={{border:"2px solid blue", borderRadius:"5px", boxShadow:"2px 1px 3px 1px #5dbeeb" ,width:"100%",height:"50px"}}>
<MenuItem key={231} value="Location">Location</MenuItem>
<MenuItem key={232} value="Searchbar">Searchbar</MenuItem>
<MenuItem key={33} value="Footer">Footer</MenuItem>
<MenuItem key={454} value="Sponsor">Sponsor</MenuItem>
<MenuItem key={576} value="About Us">About Us</MenuItem>
<MenuItem key={4} value="Title">Title</MenuItem>
           
          </Select>
</div>

<div className="contact_field">

<TextField style={{width:"100%"}}
name="content"
label="Content"
variant="outlined"
{...Formik.getFieldProps("content")}

>
</TextField>
</div>

<Button onClick={()=>{
  dispatch(Create_Component(Formik.values))
  dispatch(Get_component())}}>Create</Button>
</form>
<p style={{width:"100%",height:"1px", backgroundColor:"black"}}></p>
<ShowComponent/>

    </div>)

}
export default Component_main;