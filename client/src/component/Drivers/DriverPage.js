import React, {useState, useEffect, useReducer} from "react";
import {useDispatch, useSelector} from "react-redux"

import Register from "../ultils/register";
import Sidebar from "../ultils/sidebar";
import {useNavigate} from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit';
import {useFormik, FormikProvider, FieldArray} from "formik";
import {Form, Button} from "react-bootstrap";
import * as Yup from "yup";

import {ShowToast} from "../ultils/tools";
import {Avatar, Chip, IconButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import AOS from "aos";
import "aos/dist/aos.css";
import { CircularProgress } from '@mui/material';
import {
    TextField
} from "@material-ui/core";


import {notify_remove} from "../../store/actions"
import {Driver_imgs} from "../../store/actions/imgUpload";
import {Auth_me, ModifyUser} from "../../store/actions/users_action";

import Messages from "../contacts";
import Resetpasswordd from "../ultils/resetpassD";
import Refund from "../ultils/Refund";
import { ModifyDriver } from "../../store/actions/drivers_action";
import Driverbus from "../ultils/driverbus";
const Driverpage = () => {
   
    const Notify = useSelector((state) => state.Notification)
    const account = useSelector((state) => state.User)
    const Formik_img = useFormik({
        initialValues: {


            file: ""
        },
        validationSchema: Yup.object(
            {file: Yup.mixed().required("file required")}
        ),
        onSubmit: (value) => {

            let formData = new FormData();
            formData.append("file", value.file)
            dispatch(Driver_imgs(account.data._id, formData))

            setTimeout(()=>{
               
                if(Notify){
                   
                    ShowToast("SUCCESS",Notify.msg)
                    setupload(!upload) }
             },3000)


        }
    });

const [value,handleChange]=useState("")


const [editf,setf]=useState(false)
const [editla,setl]=useState(false)

const [edita,seta]=useState(false)
const [editad,setad]=useState(false)
    const [state, setstate] = useState("bus")
    const setopt = state
    const dispatch = useDispatch();
    const history = useNavigate()
    

  
   
    
    
  
    const [upload, setupload] = useState("false")
    const UplaodImg = () => {
        return (
            <div className="img_upload">
                <div className="upload_box">

                    <div style={
                        {
                            display: "flex",
                            alignContent: "end",
                            justifyContent: "right",
                            width: "100%",
                            marginTop: "-40px",
                            cursor: "pointer",
                            marginLeft: "5px"
                        }
                    }><CancelIcon onClick={
                                () => {
                                    setupload(!upload)
                                }
                            }
                            fontSize="large"/>
                    </div>
                <div>
                    <Form className="upload_main"
                        onSubmit={
                            Formik_img.handleSubmit
                    }>
                        <Form.Group className="upload_main">
                            <Form.Label>Profile</Form.Label>
                            <Form.Control type="file" label="file" id="file" name="file"

                                onChange={
                                    (event) => {
                                        Formik_img.setFieldValue("file", event.target.files[0])
                                    }
                                }/>


                        </Form.Group>
                    {
                    Formik_img.values.file === "" ? <p>please {
                        account.data.username
                    }, choose a photo
                    </p> : <Button style={
                            {margin: "10px"}
                        }
                        type="submit"
                        varient="primary">Upload</Button>
                } </Form>
            </div>


        </div>


    </div>
        )
    }
    const Panel = () => {
        if(state==="bus"){
            return(<>

            <Driverbus/></>)
        }
      
        if (state === "default") {
            return (
                <div className="profile_img">
                   
                    <Avatar style={
                            {
                                width: "200px",
                                height: "200px"
                            }
                        }
                        alt="profile"
                        src={
                            account.data.photo
                        }/><AddAPhotoIcon onClick={
                            () => {
                                setupload(!upload)
                            }
                        }
                        fontSize="large"
                        className="photo_img"/> {
                    upload ? UplaodImg() : null
                } 
                <h1 style={{marginTop:"50px"}}>My information</h1>
                
                <span style={{width:"80%",height:"2px" ,backgroundColor:"black"}}></span>
                <div className="profileDetail">
                <div className="profileD">
                    <div  className="profileDone">
                    <p style={{fontWeight:"bold",fontSize:"20px"}}>Username :</p>
                   
                              <span  style={{fontSize:"20px",marginLeft:"10px"}}>{account.data.username}</span>
                   
                    </div>
          
                    </div>
                    <div className="profileD">
                        <div  className="profileDone">
                        <p style={{fontWeight:"bold",fontSize:"20px"}}>Email :</p>
                        
                               <span style={{fontSize:"20px",marginLeft:"10px"}}>{account.data.email}</span>
                   
                   
                        </div>
                   
                    
                    </div>
                    
                    <div className="profileD">
                        <div  className="profileDone">
                        <p style={{fontWeight:"bold",fontSize:"20px"}}>Firstname :</p>
                        {editf ? <>
                               <TextField
                               id="standard-multiline-flexible"
                              
                               multiline
                               maxRows={4}
                               value={value}
                               placeholder={account.data.firstname}
                               onChange={(e)=>handleChange(e.target.value)}
                               variant="standard"
                             />
                             <span className="save_update" onClick={()=>{
                                            setTimeout(()=>{
                                                setf(!editf)
                                                if(Notify && Notify.success){
                                                    ShowToast("SUCCESS",Notify.msg)}
                                             },2000)
            
           
                                 dispatch(ModifyDriver(account.data._id,{"firstname":value}))}}>Save</span>
                             </>: 
                              <span style={{fontSize:"20px",marginLeft:"10px"}}>{account.data.firstname}</span>}
                   

                        </div>
                   
                    <EditIcon  onClick={()=>{
handleChange("")
setf(!editf)}}
                    />
                    </div>
                    
                    <div className="profileD">
                        <div  className="profileDone">
                        <p style={{fontWeight:"bold",fontSize:"20px"}}>Lastname :</p>
                        {editla ? <>
                               <TextField
                               id="standard-multiline-flexible"
                              
                               multiline
                               maxRows={4}
                               value={value}
                               placeholder={account.data.lastname}
                               onChange={(e)=>handleChange(e.target.value)}
                               variant="standard"
                             />
                             <span className="save_update" onClick={()=>{
                                       setTimeout(()=>{
                                        setl(!editla)
                                        if(Notify && Notify.success){
                                            ShowToast("SUCCESS",Notify.msg)}
                                     },2000)
    
  
                                 dispatch(ModifyDriver(account.data._id,{"lastname":value}))}}>Save</span>
                             </>: 
                               <span style={{fontSize:"20px",marginLeft:"10px"}}>{account.data.lastname}</span>}
                    
                        </div>
                    
                    <EditIcon  onClick={()=>{
                        handleChange("") 
                        setl(!editla)}}/>
                    </div>
                  
                   
                  
                    <div className="profileD">
                    <div  className="profileDone">
                    <p style={{fontWeight:"bold",fontSize:"20px"}}>Age :</p>
                    {edita ? <>
                               <TextField
                               id="standard-multiline-flexible"
                              
                               multiline
                               maxRows={4}
                               value={value}
                               placeholder={account.data.age}
                               onChange={(e)=>handleChange(e.target.value)}
                               variant="standard"
                             />
                             <span className="save_update" onClick={()=>{
                                 setTimeout(()=>{
                                    seta(!edita)
                                    if(Notify && Notify.success){
                                        ShowToast("SUCCESS",Notify.msg)
                                     } 
                                 },2000)

dispatch(ModifyDriver(account.data._id,{"age":value}))} }>Save</span>
                             </>: 
                               <span style={{fontSize:"20px", marginLeft:"10px"}}>{account.data.age}</span>}
                   
                       </div>
                   
                    <EditIcon  onClick={()=>{
                        handleChange("")
                        seta(!edita)}}/>
                    </div>
                    
                    <div className="profileD">
                        <div  className="profileDone">
                        <p style={{fontWeight:"bold",fontSize:"20px"}}>Address:</p>
                    {editad ? <>
                               <TextField
                               id="standard-multiline-flexible"
                              
                               multiline
                               maxRows={4}
                               value={value}
                               placeholder={account.data.address}
                               onChange={(e)=>handleChange(e.target.value)}
                               variant="standard"
                             />
                             <span className="save_update" onClick={()=>{
                                 dispatch(ModifyDriver(account.data._id,{"address":value}))
                                 setTimeout(()=>{
                                    setad(!editad)
                                    if(Notify && Notify.success){
                                        ShowToast("SUCCESS",Notify.msg)}

                                 },2000)


                                 }}>Save</span>
                             </>: 
                               <span style={{fontSize:"20px", marginLeft:"10px"}}>{account.data.address}</span>}
                  
         
                        </div>
                   
                    <EditIcon onClick={()=>{
                        handleChange("")
                        setad(!editad)}}/>
                    </div>

                   
                    
                </div>
                </div>
                
            )
        }
        if (state === "contact") {
            return (
                <>
                   
                    <div>

                        <Messages/>
                    </div>
                </>
            )
        }
   
      
        if (state === "password") {
            return (
                <>
                   <Resetpasswordd option={setstate}/>
                </>
            )
        }
        if (state === "trips") {
            return (
                <>
                    <p>password</p>
                </>
            )
        }


    }
    return (
        <div className="user_area_page">
            <Sidebar setoption={setopt}
                option={setstate}/>
            <div className="page_area" >
                <div style={
                    {
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        fontWeight: "bolder"
                    }
                }>
                    <div className="page_bar">
                        <p className={
                                state === "default" ? "user_option" : null
                            }
                            style={
                                {margin: "20px"}
                            }
                            onClick={
                                () => setstate("default")
                        }>Profile</p>
                        <p style={
                                {margin: "20px"}
                            }
                            className={
                                state === "bus" ? "user_option" : null
                            }
                            onClick={
                                () => setstate("bus")
                        }>Bus</p>
                        <p style={
                                {margin: "20px"}
                            }
                            className={
                                state === "contact" ? "user_option" : null
                            }
                            onClick={
                                () => setstate("contact")
                        }>Contact</p>


                    </div>
                </div>
                <div> {
                    Panel()
                } </div>


            </div>


        </div>
    )
}

export default Driverpage;
