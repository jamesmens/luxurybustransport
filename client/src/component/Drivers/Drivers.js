import React,{useEffect,useState,useReducer} from "react"
import {useDispatch,useSelector} from "react-redux"
import {Get_driver,Driver_del,Invite,Driver_suspend,Driver_unblock,Alldriver,triggerdriver} from "../../store/actions/drivers_action"
import {ShowToast} from "../ultils/tools"
import { useNavigate } from "react-router-dom"
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
import AOS from "aos";
import "aos/dist/aos.css";
import CancelIcon from '@mui/icons-material/Cancel';


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



////////////////mui
import {
    List,
    ListItemAvatar,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avater,
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
import { Loading } from "../ultils/Loading"
import { Avatar } from "@mui/material"
///////////////////////////////
const AllDriver=()=>{
    const dispatch=useDispatch()
    const history=useNavigate()
    const user=useSelector((state)=>state.User)

    useEffect(()=>{
        if(user.auth && user.data.role==="user"){
            history("/")
        }
        if(user.auth && user.data.role==="driver"){
            history("/")
        }
    })
    const Notify = useSelector((state) => state.Notification)
    const Drivers=useSelector((state)=>state.Drivers)
    const driverall=useSelector((state)=>state.D)
    useEffect((state)=>{
        if(Drivers && !Drivers.AllDriver){
            dispatch(Get_driver(init_sort))
        }
       })
     
       useEffect(()=>{
           if(Notify && Notify.success){
               ShowToast("SUCCESS",Notify.msg)
               dispatch(notify_remove())
           }
       })
       useEffect(()=>{
        
            
            dispatch(Alldriver())
      
    })
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




const [switchdchange,setswitch]=useState(true)


    const init_sort={sortBy:"_id",order:"asc",limit:10,skip:0}
   
const [sort,setSort]=useReducer((state,newv)=>({...state,...newv}),init_sort)
const  [data_s,setdata]=useState("all")
const [getvalue,setvalue]=useState();
const [InVite,setInvite]=useState(false)

   const Filterdate=(data)=>{
if(data_s==="search"){
    return data.filter((item)=>{
        if(item && item.username) {
            return  item.username.indexOf(getvalue) >-1
            }
    }) 
} 

if(data_s ==="all" ){
    return data
}
if(data_s==="active"){
    return data.filter((item)=>item.status==="active")

}
if(data_s==="pending"){
    return data.filter((item)=>item.status==="pending")
}

   
}
///////////////////////////////////

const [pop,setpop]=useState(false)
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
        
        <>
        { user.bus && user.bus[0] ?
        <div style={{fontFamily:"Frekoda",margin:"4px"}}>Bus Number: <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>{user.bus[0].busNumber}</span></div>
         

        :  <div style={{fontFamily:"Frekoda",margin:"4px"}}>Bus Number: <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>No bus allocated</span></div>
        }
        </>
        { user.bus && user.bus[0] ?
        <div style={{fontFamily:"Frekoda",margin:"4px"}}>Bus brand: <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>{user.bus[0].name}</span></div>
         

        :  <div style={{fontFamily:"Frekoda",margin:"4px"}}>Bus brand name: <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>null</span></div>
        }
        <>
        { user.bus && user.bus[0] ?
        <div style={{fontFamily:"Frekoda",margin:"4px"}}>Bus Company name: <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>{user.bus[0].name}</span></div>
         

        :  <div style={{fontFamily:"Frekoda",margin:"4px"}}>Bus Number: <span style={{color:"rgb(56, 35, 35)",fontWeight:"bolder"}}>null</span></div>
        }
        
        </>

         </div>
        
        </div>
        <div className="box_brief">
        <div style={{fontFamily:"Frekoda",marginBottom:"30px",fontSize:"20px"}}>Brief description </div>
        {
            InVite ?
            <>
            <form style={{width:"100%"}} onSubmit={Formiks.handleSubmit}>

<div style={{width:"100%"}} className="contact_field">

  <TextField style={{width:"100%"}}
  name="email"
  label="Email"
variant="outlined"
{...Formiks.getFieldProps("email")}
>
  </TextField>
</div>

<div className="contact_field">
  <TextField  style={{width:"100%"}}
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
<Button  onClick={()=>dispatch(Invite(user._id,Formiks.values))} style={{width:"50%", color:"white"}}  type="submit">Invite</Button>


</form>
            </>
           :
           <span className="about_me">{user.about_me}</span> 
         
        }
       
      {
          InVite ?  <Button onClick={()=>setInvite(!InVite)} style={{margin:"10px"}} >about me</Button>:
          <Button onClick={()=>setInvite(!InVite)} style={{margin:"10px"}} >Invite</Button>
      }
      
     
      {
          user.approve ? null:
          <Button  style={{margin:"10px"}}>{user.approve}</Button>


      }
       {
           user.active==="true" ?
           <Button  style={{margin:"10px"}} onClick={()=>dispatch(Driver_suspend(user._id))} >Block</Button>:
           <Button  style={{margin:"10px"}} onClick={()=>dispatch(Driver_unblock(user._id))} >unblock</Button>

       }
       
       
{
    user.approve==="no" ?
    <Button  style={{margin:"10px"}}  onClick={()=>{

        dispatch(Driver_del(user._id))
        setTimeout(()=>{
            dispatch(triggerdriver(sort))
        },1000)
        }}>Decline</Button>:
        <Button  style={{margin:"10px"}}  onClick={()=>{

            dispatch(Driver_del(user._id))
            setTimeout(()=>{
                dispatch(triggerdriver(sort))
            },1000)
            }}>Remove Driver</Button>


}
       
      
        </div>
  
    </div>
      
        
    
        
      
       </div>
        </div>
    )
}
   ////////////////////////
   
   //////////////////////
  
    const [showModal,setShowModal]=useState(false)
    const [user_id,getuser]=useState([])
   
  
    const Delete_action=(value)=>{

   return(<div className="delete_m">
   <div style={{fontFamily:"frekoda", color:"white",fontSize:"20px"}}> You want to delete <p style={{fontFamily:"Roboto" ,fontWeight:"bold",color:"whitesmoke"}}>{value.username} ?</p> </div>
   <Button onClick={()=>{
       
       dispatch(Driver_del(value._id))
       setTimeout(()=>{
        dispatch(triggerdriver(sort))

       },1000)
      
      
       

       
      
      }}>Yes, Delete</Button>
   </div>)
    }
    return(<>
    {Drivers && Drivers.AllDriver ?


    <div  className="admin_driver">
       
        <div className="filter_plate" >
            <h1 style={{fontFamily:"frekoda", fontWeight:"bolder" ,margin:"0 40px 0 0 "}}>Driver's Board </h1>
              <ListItemIcon><FilterListIcon fontSize="large"/></ListItemIcon>
              <div>Filter by</div>
              <Button onClick={()=>setdata("all")} style={{marginLeft:"20px"}}>Default</Button>
              <Button onClick={()=>setdata("pending")} style={{margin:"15px"}}>Pending</Button>
              <Button onClick={()=>setdata("active")}>Active</Button>
              <InputGroup style={{width:"20%", margin:"20px"}}  >
                                  
                                    <FormControl onChange={(e)=>setvalue(e.target.value)} style={{width:"500px",padding:"10px"}} type="text" aria-label="Small" aria-describedby="inputGroup-sizing-lg" placeholder="Search ..."></FormControl>
                                </InputGroup>
                                <Button onClick={()=>setdata("search")}>Search</Button>
                               
                                </div>
                                
                                
            
              
      
<>
       
           
                {
                    switchdchange ?
                    <Button onClick={()=>setswitch(!switchdchange)} style={{margin:"50px"}}>New Applications</Button>
                    :
                    <Button onClick={()=>setswitch(!switchdchange)} style={{margin:"50px"}}>All Drivers</Button>

                }
                </>
            
             {
            switchdchange ?
            <div className="table_description">

            
                <Table className="table"  striped bordered hover   >
                    <thead className="table_hd" style={{textAlign:"center",justifyContent:'center',}}>
                        <tr style={{fontFamily:"frekoda",fontSize:"20px"}}>
                         <th >No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Bus assigned</th>
                            <th>Status</th>
                            <th>Options</th>

                        </tr>

                    </thead>
                    <tbody className="table_body">
                    { Drivers && Drivers.AllDriver ? 
                    Filterdate(Drivers.AllDriver).map((state)=>{
                        return(
                            <tr key={state._id}  >
                                <td className="table_no" style={{backgroundColor:"darkgray", fontWeight:"bolder"}}>{Drivers.AllDriver.indexOf(state)+1}</td>
                            <td>{state.username}  </td>
                            <td>{state.email}</td>
                            <td> {state.address} </td>

                            <td>{}  </td>
                            <td>{state.status}</td>
                            <td className="table_options"><Popup trigger={<DeleteIcon  className="t_option_d"/>} position="left center">
    {Delete_action(state)}
  </Popup> <EditIcon className="t_option_e" onClick={()=>{
      setpop(!pop)
      getuser(state)
  }}/>{pop ? <>{Prompt(user_id)}</>:null}</td>
                            </tr>

                        )
                    }
                    )
                    
                            
                     :null}  
                    </tbody>
                    
                    
                    </Table>   
                    {
                        driverall && driverall.AllD ?
                        <>{  Drivers && Drivers.AllDriver ?
                            <>
                            {driverall.AllD.length===Drivers.AllDriver.length ?
                            null:  <Button onClick={()=>{
                                const Skip=sort.skip+sort.limit
                                setSort({skip:Skip})
                                dispatch(Get_driver({sort,skip:Skip}))
                            }} style={{width:"45%"}}>load more</Button>
                 }
                            </>

                            :null

                        }
                        </>
                        :null
                    }
                          
            
           
           
        </div>
             :
             <>
             {
            driverall && driverall.AllD ? 
            <>{
                 driverall.AllD.filter((i)=>i.approve ==="no").length===0 ?null: 
                <>
                 <div  className="driver_pal">
            <h1 style={{fontStyle:"italic"}}>New applications waiting for review !!</h1>
        {

            Drivers && Drivers.AllDriver ?
            Drivers.AllDriver.filter((item)=>item.approve ==="no").map((user)=>{
                return(
                    <>
                    <div className="driver_p" >
                    <List   sx={{ width: '100%', maxWidth: 360 }}>
   <ListItem alignItems="flex-start" className="user_box">
     <ListItemIcon>
      <AccountCircleIcon fontSize="large" className="bus_icon"/>
     </ListItemIcon>
     <ListItemText
       primary={user.firstname + "" + user.lastname}
       
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
       <ListItemIcon>
      <MessageIcon className="bus_icon"/>
   
     </ListItemIcon>
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
          <Button onClick={()=>{
           
            }} style={{width:"45%"}}>load more</Button>
        </div>


                
                </>

            }
            </>
            :null
            

        }
             </>
            
            
        }
   
           
        
       

    </div> :Loading() }

    </>)
}
export default AllDriver