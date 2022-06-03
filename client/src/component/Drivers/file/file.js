import React from "react"
import {Form,Button} from "react-bootstrap"
import {useFormik} from "formik"
import {Upload_f} from "../../../store/actions/file_action"
import {useDispatch} from "react-redux"
 import * as Yup from "yup"

const Files=()=>{
    const dispatch=useDispatch()
    const formik=useFormik({
initialValues:{
    file:""

},
validationSchema:Yup.object({
    file: Yup.mixed()
    .required("file required")

}),
onSubmit:(value)=>{
  
    let formData=new FormData() ;  
    formData.append("file",value.file)
    dispatch(Upload_f(formData))
  
    
   
    
}})
    const ErrorHandler=(formik,values)=>({
        error:formik.errors[values] &&formik.touched[values] ? true:false,
        helperText:formik.errord[values] && formik.touched[values] ? formik.errors[values] :null 
    })
    return(
        <div>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
            <Form.Label>Default file input example</Form.Label>
    <Form.Control type="file"
     label="file"
     name="file"
     onChange={(event)=>{
        formik.setFieldValue("file",event.target.files[0])
    }}/>
                
                   {
                   formik.errors.file && formik.touched.file ?
                   <>Error</> :null
                }

                
            </Form.Group>
            <Button type="submit" varient="primary">Upload</Button>

        </Form>
        </div>
    )
}
export default Files