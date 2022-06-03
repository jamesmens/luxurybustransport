

import React,{useState} from "react";
import {NavLink} from "react-router-dom"
import MiniDrawer from "../home/drawer";
import {Link as RouterLink} from "react-router-dom"
import {
 
    ListItemText,
    TextField,
  } from "@material-ui/core";
  
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import MenuBookIcon from '@mui/icons-material/MenuBook';


const Header=()=>{

    return(

        <header className="headers">
            
            <MiniDrawer/>
           
                    <div className="brandname">Luxury Transport</div>
           
       

       
            <div className="left_n" >
               
           
            <NavLink to="/operator/all_books" className={(nav)=>nav.isActive ? "nav_a" :"nav_no "}><MenuBookIcon   /> Bookings</NavLink>


            </div>
            <NavLink to="/" className={(nav)=>nav.isActive ? "nav_a" :"nav_no "}> <AddAlertIcon />Inboxs</NavLink>
           
                 
            
     
        </header>

    )
}

export default Header;