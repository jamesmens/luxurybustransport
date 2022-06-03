import React,{useState} from "react"
import {useSelector} from "react-redux"
import PersonIcon from '@mui/icons-material/Person';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LockResetIcon from '@mui/icons-material/LockReset';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import MessageIcon from '@mui/icons-material/Message';
import CommuteIcon from '@mui/icons-material/Commute';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import { Avatar } from "@mui/material";
const Sidebar=(props)=>{
  const account = useSelector((state) => state.User)
    return(
        <><div className="sidebar">
       
          <div style={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center"}}>
           <div style={{display:"flex",flexDirection:"column",alignItems:"center", paddingTop:"20px"}}>{account.data.photo==="string" ? <Avatar alt="profile" src={account.data.photo}/> :<Avatar style={{width:"50px",height:"50px"}} alt="profile" src={account.data.photo}/>} </div>
            <p style={{fontWeight:"bold"}}>{account.data.firstname + " " + account.data.lastname}</p>
            
            </div>
            <hr></hr>
          <div style={{marginBottom:"20px"}} className={ props.setoption==="default" ? "user_option": null} onClick={()=>props.option("default")}>  <BorderColorIcon /> Edit my profile</div>
          <div style={{marginBottom:"20px"}} className={props.setoption==="password" ? "user_option": null} onClick={()=>props.option("password")}>  <LockResetIcon />Reset Password</div>
          
          <div style={{marginBottom:"20px"}} className={ props.setoption==="trips" ? "user_option": null}  onClick={()=>props.option("trips")}>  < CommuteIcon />My trips</div>
         
          <div style={{marginBottom:"20px"}} className={ props.setoption==="contact" ? "user_option": null} onClick={()=>props.option("contact")}>  < MessageIcon />contack luxurybus</div>
          {account.data.role==="user" ? null:  <div style={{marginBottom:"20px"}} className={ props.setoption==="bus" ? "user_option": null}  onClick={()=>props.option("bus")}>  <  DirectionsBusFilledIcon />my bus</div>}
         {account.data.role==="driver" ? null : <div style={{marginBottom:"20px"}} className={ props.setoption==="cancel" ? "user_option": null}  onClick={()=>props.option("cancel")}>  <    PhonelinkEraseIcon />cancel ticket {props.setoption}</div> }
         
         <hr></hr>

         
          
        
         
        </div>
        </>
    )
}
export  default Sidebar