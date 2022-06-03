import React,{useEffect, useState} from "react" 
import { Form , Button} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik, } from "formik";
import {ShowToast } from "./tools"

import {useDispatch,useSelector} from "react-redux"
import {
    Divider,

    TextField,
 
    MenuItem,
  
    Select,
  } from "@mui/material";
import { Component_img, Create_Component, Delete_com, Get_component } from "../../store/actions/components";
import { Types } from "mongoose";
import { notify_error } from "../../store/actions";
import ShowComponent from "./ShowComponent";


const Uploadimg=(props)=>{
    
  
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


  const Formik_img = useFormik({
    initialValues: {
     
  
      file:""
    },
    validationSchema: Yup.object({
     
      file: Yup.mixed()
    .required("file required"),
    
    }),
    onSubmit: (value) => {
   
      let formData=new FormData() ;  
      formData.append("file",value.file)
      
   

      dispatch(Component_img(`${props.id}`,formData))
      setTimeout(()=>{
        dispatch(Get_component())
      },1000)
      dispatch()
     
      
 
     
    },
  });
    return(
    
<div>
                    <Form className="upload_com"
                        onSubmit={
                            Formik_img.handleSubmit
                    }>
                        <Form.Group className="com_margin">
                            
                            <Form.Control type="file" label="file" id="file" name="file"

                                onChange={
                                    (event) => {
                                        Formik_img.setFieldValue("file", event.target.files[0])
                                     
                                    }
                                }/>


                        </Form.Group>
                       
                    {
                    Formik_img.values.file === "" ?null: <Button  type="submit"
                       
                       style={{width:"30%"}} className="com_margin" varient="primary">Update</Button>
                }
                 <Button className="com_margin" onClick={()=>{
                  dispatch(Delete_com(`${props.id}`))
                 setTimeout(()=>{
                  dispatch(Get_component())
                 },1000)
                 
                 }
                  }>Delete</Button>
                 </Form>

            </div>
  )

}
export default Uploadimg;