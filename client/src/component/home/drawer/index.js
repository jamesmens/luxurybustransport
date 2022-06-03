import React,{useState,useReducer} from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  List,
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,createTheme,ThemeProvider,Box
} from "@material-ui/core";

import {useDispatch} from "react-redux"


///// icons
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ChairIcon from '@mui/icons-material/Chair';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from '@mui/icons-material/Logout';
import CommentIcon from '@mui/icons-material/Comment';

import { Sign_out } from "../../../store/actions/users_action";


///////////////////////////

//////////////////////////
const MiniDrawer = () => {
  const [state, setstate] = useState(false);
  const dispatch=useDispatch()
  return (
    <>

   
     <MenuIcon className="drawer_btn " fontSize="large"  onClick={() => setstate(true)} />
      <Drawer anchor={"left"} open={state} onClose={() => setstate(false)} >
        <div  className="admin_n"></div>
       <div className="mini_c">
     <ListItem 
       component={RouterLink}
       to="/operator/adminhome"
       onClick={() => setstate(false)}>
       <ListItemIcon>
         <AdminPanelSettingsIcon className="ff"  sx={{color:"#B23850"}} fontSize="large"/>
       </ListItemIcon>
       <ListItemText primary="Home" style={{color:"#B23850",fontFamily:"Fredoka"}} />
     </ListItem>
        <Divider />
        <List>
          <ListItem
          className="f"
            button
            component={RouterLink}
            to="/operator/allbuses"
            onClick={() => setstate(false)}
          >
            <ListItemIcon>
              <AirportShuttleOutlinedIcon className="ff"  sx={{color:"white"}} fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="All Buses" style={{color:"white"}}  />
          </ListItem>
          <ListItem className="f"
            button
            component={RouterLink}
            to="/operator/all_books"
            onClick={() => setstate(false)}
          >
            <ListItemIcon  >
              <BookmarkAddIcon className="ff" fontSize="large" sx={{color:"white"}}  />
            </ListItemIcon>
            <ListItemText primary="Bookings"  style={{color:"white"}}  />
          </ListItem>
          <ListItem
            className="f"
            button
            component={RouterLink}
            to="/operator/All_users"
            onClick={() => setstate(false)}
          >
            <ListItemIcon>
              <GroupAddOutlinedIcon className="ff" fontSize="large" sx={{color:"white"}} />
            </ListItemIcon>
            <ListItemText primary="Users"  style={{color:"white"}}  />
          </ListItem>
          <ListItem
            button
            className="f"
           component={RouterLink}
           to="/operator/AllDrivers"
            onClick={() => {
           
              setstate(false)}}
          >
            <ListItemIcon>
              <PersonAddAltIcon className="ff" fontSize="large" sx={{color:"white"}} />
            </ListItemIcon>
            <ListItemText primary="Drivers"   style={{color:"white"}} />
          </ListItem>
          <Divider ></Divider>
          <ListItem
            className="f"
            button
            component={RouterLink}
            to="/operator/AllDrivers"
            onClick={() => setstate(false)}
          >
            <ListItemIcon>
              < CommentIcon  className="ff" fontSize="large" sx={{color:"white"}} />
            </ListItemIcon>
            <ListItemText primary="comments"  style={{color:"white"}}  />
          </ListItem>
          <ListItem
            className="f"
            button
            component={RouterLink}
            to="/"
            onClick={() =>{
              dispatch(Sign_out())
              setstate(false)}}
           
          >
            <ListItemIcon>
              <DashboardIcon  className="ff" fontSize="large" sx={{color:"white"}} />
            </ListItemIcon>
            <ListItemText primary="Signout"  style={{color:"white"}}  />
          </ListItem>
        
          
          
        </List>
      
       </div>
        

      </Drawer>





 
     
    </>
  );
};
export default MiniDrawer;
