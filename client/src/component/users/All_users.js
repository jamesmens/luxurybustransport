import React,{useEffect,useState,useReducer} from "react"
import {useDispatch,useSelector} from "react-redux"
import {Get_driver,Driver_del,Invite} from "../../store/actions/drivers_action"
import {Get_user, UserRecords,User_unblock,User_suspend} from "../../store/actions/users_action"
import {ShowToast} from "../ultils/tools"
import AOS from "aos";
import "aos/dist/aos.css";
import {
    Modal,Button,ButtonGroup,ButtonToolbar,InputGroup,FormControl

} from  "react-bootstrap"
import { Form, useFormik,yupToFormErrors } from "formik"
import * as Yup from "yup"
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Table,Pagination} from "react-bootstrap"
import Moment from "react-moment"
import { LinkContainer} from "react-router-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css';
import CancelIcon from '@mui/icons-material/Cancel';



import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



////////////////mui
import {
    List,
    ListItemAvatar,
    Divider,
    Avatar,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    TextField,
    Typography
} from "@material-ui/core";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageIcon from '@mui/icons-material/Message';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { notify_remove } from "../../store/actions"

///////////////////////////////
const All_users=()=>{
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
/////////////////////////formik
const Formiks=useFormik({
    initialValues:{
    
      email:"",
     
      message:""
    },
    validationSchema:Yup.object({
email:Yup.string().required("email required")
.email("sorry, email not valid"),

message:Yup.string().required("please say something")
.max(500,"sorry message too long")

    })
    ,onSubmit:(value,{reset})=>{
    
   


    }
  })

  const ErrorHelper=(formik,value)=>({
    error:formik.errors[value] && formik.touched[value] ? true  :false,
    helperText: formik.errors[value]  && formik.touched[value] ? formik.errors[value]:null
  })



////////////////////////////////







    const dispatch=useDispatch()
    useEffect(()=>{
      if(Notify && Notify.success){
        ShowToast("SUCCESS",Notify.msg)
        dispatch(notify_remove())
      }
    })

const Notify=useSelector((state)=>state.Notification)
const init_sort={sortBy:"_id",order:"asc",limit:10,skip:0}
   
const [sort,setSort]=useReducer((state,newv)=>({...state,...newv}),init_sort)
const  [data_s,setdata]=useState("all")
const [getvalue,setvalue]=useState();
const [InVite,setInvite]=useState(false)
const Filterdate=(data)=>{
  if(data_s==="search"){
      return data.filter((item)=>{
          if(item && item.username) {
              return  item.username.indexOf(getvalue) >-1 || item.email.indexOf(getvalue) >-1 ||  item.firstname.indexOf(getvalue) >-1 ||  item.lastname.indexOf(getvalue) >-1
              }
      }) 
  } 
  
  if(data_s ==="all" ){
      return data
  }
  if(data_s==="active"){
      return data.filter((item)=>item.active==="true")
  
  }
  if(data_s==="blocked"){
    return data.filter((item)=>item.active==="false")

}
 
     
  }
///////////////////////////////////
const Usera=useSelector((state)=>state.User_record)
const [pop,setpop]=useState(false)
useEffect(()=>{
  if( Usera && !Usera.Records ){
  
   dispatch(UserRecords(init_sort))
  }
  

},[dispatch])

const Prompt=(user)=>{
  return(
      <div  className="register_option">
          <div className="drive_container"> 
          <div  style={{display:"flex", alignContent:"end",justifyContent:"right",width:"100%",cursor:"pointer",marginLeft:"10px",marginTop:"-10px"}}><CancelIcon  
             onClick={()=>{
              setInvite(false)
              setpop(!pop)}}  fontSize="large" /></div>
     <div className="driver_box">
    
      <div className="box_detail"> 
       <div><Avatar src={user.photo} alt="photo"  style={{
                              width: "150px",
                              height: "150px"}}/> </div>
       <div style={{marginTop:"40px"}}>
       <div style={{fontFamily:"Frekoda",margin:"4px" }}>firstName  <span style={{color:"rgb(56, 35, 35)", fontWeight:"bolder"}} >: {user.firstname}</span></div>
      <div style={{fontFamily:"Frekoda",margin:"4px"}}>lastname  <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>:{user.lastname}</span></div>
      <div style={{fontFamily:"Frekoda",margin:"4px"}}>username  <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>:{user.username}</span></div>
      <div style={{fontFamily:"Frekoda",margin:"4px"}}>Email  <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>:{user.email}</span></div>
      <div style={{fontFamily:"Frekoda",margin:"4px"}}>Address  <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>:    {user.address}</span></div>
      <div style={{fontFamily:"Frekoda",margin:"4px"}}>Age <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>:       { user.age}</span></div>
      
     
      
     

       </div>
      
      </div>
      <div className="box_brief" style={{width:"50%",marginRight:"10%" }}>
   
      {
          InVite ?
          <>
          <form style={{width:"100%"}} onSubmit={Formiks.handleSubmit}>

<div style={{width:"100%"}} className="contact_field">

<TextField style={{width:"100%", backgroundColor:"white"}}
name="email"
label="Email"
variant="outlined"
{...Formiks.getFieldProps("email")}
>
</TextField>
</div>

<div className="contact_field">
<TextField  style={{width:"100%",backgroundColor:"white"}}
name="message"
label="Message"
variant="outlined"
rows={4}
multiline
{...Formiks.getFieldProps("message")}
{...ErrorHelper(Formiks,"message")}
>
</TextField>
</div>
<Button  onClick={()=>dispatch(Invite(user._id,Formiks.values))} style={{width:"50%", color:"white"}}  type="submit">Message</Button>


</form>
          </>
         :null
         
       
      }
     
    {
        InVite ?  <Button onClick={()=>setInvite(!InVite)} style={{margin:"10px"}} >close</Button>:
        <Button onClick={()=>setInvite(!InVite)} style={{margin:"10px"}} >message</Button>
    }
    
   
     {
         user.active==="true" ?
         <Button  style={{margin:"10px"}} onClick={()=>dispatch(User_suspend(user._id))} >Block</Button>:
         <Button  style={{margin:"10px"}} onClick={()=>dispatch(User_unblock(user._id))} >unblock</Button>

     }
     
 
    
      </div>

  </div>
    
      
  
      
    
     </div>
      </div>
  )
}
   ////////////////////////
   const users=useSelector((state)=>state.User_record)
 
   //////////////////////
   const Loadmore=() => {
    const Skip = sort.skip + sort.limit
    setSort({skip: Skip})
    dispatch(UserRecords({sort, skip: Skip}))
}

   //////////////////////////
  
    const [showModal,setShowModal]=useState(false)
    const [user_id,getuser]=useState([])
   
  
   
    return(<>

    <div>
        <div className="filter_plate">
            <h1 style={{fontFamily:"frekoda", fontWeight:"bolder" ,margin:"0 40px 0 0 "}}>User's Board </h1>
              <ListItemIcon><FilterListIcon fontSize="large"/></ListItemIcon>
              <div>Filter by</div>
              <Button onClick={()=>setdata("all")} style={{marginLeft:"20px"}}>Default</Button>
              
              <Button onClick={()=>setdata("active")}>Active</Button>
              <Button onClick={()=>setdata("blocked")}>blocked</Button>
              
              <InputGroup style={{width:"20%", margin:"20px"}}  >
                                  
                                    <FormControl onChange={(e)=>setvalue(e.target.value)} style={{width:"500px",padding:"10px"}} type="text" aria-label="Small" aria-describedby="inputGroup-sizing-lg" placeholder="Search ..."></FormControl>
                                </InputGroup>
                                <Button onClick={()=>setdata("search")}>Search</Button></div>
            
              
      

   
        
   
          
        <div className="driver_pal">
            <div data-aos="zoom-in" style={{fontStyle:"italic"}}>All users !!</div>
        {

users && users.Records ?
Filterdate(users.Records).map((user,index)=>{
                return(
                    <>
                    <div
     key={index} className="driver_p" >
                    <List   sx={{ width: '100%', maxWidth: 360 }}>
   <ListItem  key={index} alignItems="flex-start" className="user_box">
     <ListItemIcon>
      <AccountCircleIcon fontSize="large" className="bus_icon"/>
     </ListItemIcon>
     <ListItemText
       primary={user.firstname + " " + user.lastname}
       
     />
      <ListItemText
       primary={ "Email " +": " + user.email}
      
     />
      <ListItemText
       primary={ "Address " +": " + user.address}
      
     />
      <ListItemText
       primary={"Age "+ ": " + user.age}
      
     />
     {
       user.active==="true"?
       <ListItemText
       color="primary"
       primary={"Active"}
      
     />:
     <ListItemText
     primary={"Blocked"}
    
   />
     }
  

     {
         pop ?
         <>{Prompt(user_id)}</>
         :null
     }
   
     <ListItemIcon >  
         <VisibilityIcon onClick={()=>{setpop(!pop)
        getuser(user)}} />
    </ListItemIcon>
   </ListItem>
 

   </List>
            
                    </div>
                    
                          </>
                )
            })


            
            : null
        } 
          <Button  style={{width:"45%"}} onClick={()=>Loadmore()}>load more</Button>
        </div>

    </div>

    </>)
}
export default All_users