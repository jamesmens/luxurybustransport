

import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
  import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import Register from "../ultils/register";
import SignIn from "../ultils/signin";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Cartprop from "../ultils/cartprops"
import {Avatar, Chip, IconButton,Badge} from "@mui/material";



import { makeStyles } from '@material-ui/core/styles';
import { notify_remove } from "../../store/actions";
import { ShowToast } from "../ultils/tools";
import { Sign_out } from "../../store/actions/users_action";
import Account_reset from "../ultils/UserReset";

const UserHeader=()=>{
    
    const dispatch=useDispatch();
    const useStyles = makeStyles((theme) => ({
        Icon_IMG: {
          '& svg': {
            fontSize: 250,

          },
         
        }}))
        const classes=useStyles()

    const [state,setstate]=useState(false)
    const [userOption,setoption]=useState("register")
const [switchlog,setlog]=useState(false)
    const [openprop,setprop]=useState(false)
    const [cartp,setcprop]=useState(false)
    const notification=useSelector((state)=>state.Notification)
    const account=useSelector((state)=>state.User)
    const component=useSelector((state)=>state.Carts)
   
    useEffect(()=>{
        if(notification && notification.success && notification.msg !=="ok" ){
            ShowToast("SUCCESS",notification.msg)
            dispatch(notify_remove())
            setTimeout(()=>{
                setprop(false)
            },1000)
        }
        if(notification && notification.error && notification.msg !=="ok"){
            ShowToast("ERROR",notification.msg)
            setTimeout(()=>{
                dispatch(notify_remove())
            },4000)
           
      
        }

    })
    
               
               

        
    const popup=()=>{
        return(<div  className="register_option">
            <div className="register_container"> 
            <div  style={{display:"flex", alignContent:"end",justifyContent:"right",width:"100%",marginTop:"-40px",cursor:"pointer",marginLeft:"5px"}}><CancelIcon  onClick={()=>{
                setprop(!openprop)
                dispatch(notify_remove())}} fontSize="large" /></div>
       <div className="register_box">
      
          {
               notification && notification.msg !="ok" ?
               <>
               {
                  userOption==="register" ? <h1 style={{fontFamily:"frekoda",marginBottom:"10px"}}>Register to Join Us</h1>
                  :  <h1 style={{fontFamily:"frekoda",marginBottom:"10px"}}>Login</h1>
               }
               </>
               
               :
               <div >< MailIcon className={classes.Icon_IMG} fontSize="large" style={{color:"blue"}}/></div>
               
                
          } 
           
           {
               notification && notification.msg !="ok" ?
               <div  onClick={()=>dispatch(notify_remove())}>  {
                userOption==="register" ? 
              <Register/>
                : <div>{ 

                    switchlog ?
                 <Account_reset setoption={setoption}/>:<SignIn/>

                }</div>
                
            }</div>
              
               :
               <div  onClick={()=>dispatch(notify_remove())} style={{fontFamily:"frekoda",fontWeight:"bolder",fontSize:"20px"}}>Congrats, please check your email inbox to verify your account</div>
               
           }
           {
               notification &&  notification.error ?
               <p style={{color:"red",fontFamily:"frekoda"}}>{notification.msg}</p>:null
           }
           
           {
               userOption==="register" ? 
               <p>Already have an account ? <span style={{color:"blue",fontFamily:"frekoda",fontWeight:"bold",cursor:"pointer"}}  onClick={()=>{
                   if(notification && notification.msg==="ok")
                   {
                       dispatch(notify_remove())
                   }
                   dispatch(notify_remove())
                setoption("login")}}>Login</span></p>:<>
               <div> {switchlog ? null:<p>Don't have an account? <span style={{color:"blue",fontFamily:"frekoda",fontWeight:"bold",cursor:"pointer"}} onClick={()=>setoption("register")}>Register</span> </p>}</div>
               <div> {switchlog ? <p>Don't have an account? <span style={{color:"blue",fontFamily:"frekoda",fontWeight:"bold",cursor:"pointer"}} onClick={()=>{
                   setoption("register")
                   } }>Register</span> </p>:  <p style={{fontFamily:"frekoda",fontWeight:"bold",color:"blue"}} onClick={()=>setlog(!switchlog)}>forgotton password ?</p>}</div>
              
            </>


           }
    
        
       </div>
       </div>
        </div>)
    }
    return(


        <div className="headers">
            
          
           
                   
                    <NavLink to="/" className={(nav)=>nav.isActive ? "nav_a space_n" :"nav_no space_n"}> Luxury Transport  </NavLink>
       
                {openprop ?
                <div> {popup()} </div> :null
                    }
                   
       
            <div className="left_nu" >
                {(account.auth)?
                <>{ component.data.seatnumber !=="" ?
                    <NavLink to="/ticketpurchase" className={(nav)=>nav.isActive ? "nav_a space_n" :"nav_no space_n"}>
                    <Badge badgeContent={1} color="secondary">
                    <ShoppingCartIcon/>
                    </Badge>
                    </NavLink>
                        :  
                        <NavLink to="/ticketpurchase" className={(nav)=>nav.isActive ? "nav_a space_n" :"nav_no space_n"}>
                   
                    <ShoppingCartIcon/>
                  
                    </NavLink>
                    
                    }</>

                 : 
                  <div onClick={()=>{
                      setcprop(!cartp)

                  }} className="nav_a space_n">
                 
                  <ShoppingCartIcon style={{color:"rgb(172, 170, 170)"}}/>
                  
                  </div>

                }
                {
                cartp ? 
                <Cartprop cartp={cartp} setcprop={setcprop}  openprop={openprop} setprop={setprop}/>:null

                } 
            
           
                
            <NavLink to="/site_location" className={(nav)=>nav.isActive ? "nav_a space_n" :"nav_no space_n"}>Map  <ArrowDropDownIcon/> </NavLink>
          
           
            <Popup  trigger={ 
            <div> {account.data.photo==="string" ? <><AccountCircleIcon/>  <ArrowDropDownIcon/></> :<><Avatar alt="profile" src={account.data.photo}/></>}
          </div> } 
            position="bottom right"> 
            <div className="popuphover"> 
            
           
           { account && account.auth ?<NavLink className="popups" to={account.data.role==="user" ? "/userpanel" : "/driverpage" }   >Profile </NavLink> : null} 

              { account && account.data.role !=null ?<NavLink className="popups" to="/"> <p className="popups" onClick={()=>dispatch(Sign_out())}>Log out</p></NavLink> : <p onClick={()=>{
                  setlog(false)
                  dispatch(notify_remove())
                    setprop(!openprop)}  } className="popups">Register/Signin</p>}  
               
               </div></Popup>
            
           

            </div>
           

                   
            
     
        </div>

    )
}

export default UserHeader;