
import React, {useState, useEffect,useReducer} from "react";
import {Navigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {Get_driver,Alldriver} from "../../store/actions/drivers_action"
import {Get_user} from "../../store/actions/users_action"
import {UserRecords} from "../../store/actions/users_action"
import {Get_bus, Get_Seats,all_buses} from "../../store/actions/buses_action";
import {Get_bus_details} from "../../store/actions/buses_action"
import {Get_booking} from "../../store/actions/bookings"
import moment from "moment"


import {Loading} from "../ultils/Loading"

import {
    Modal,ButtonGroup,ButtonToolbar,InputGroup,FormControl,Button

} from  "react-bootstrap"

/**    mui imports */
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageIcon from '@mui/icons-material/Message';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import {
    List,
    ListItemAvatar,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Chip,
    TextField,
    Typography
} from "@material-ui/core";

import {Table,Pagination} from "react-bootstrap"
import Moment from "react-moment"
import { LinkContainer} from "react-router-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditIcon from '@mui/icons-material/Edit';
import { borderRadius } from "@mui/system";
const Load_Home = (props) => {
   
    const init_sort={sortBy:"_id",order:"asc",limit:1000,skip:0}
    const init_driv={sortBy:"_id",order:"asc",limit:2000,skip:0}

    const [sort,Setsort] =useReducer((state, new_sort)=>({...state,new_sort}),init_sort)
const user_date=(d)=>{
  return  moment(d).format("DD"-"MM"-"YY")
}


////// selectors

const mainbuses = useSelector((state) => state.B)
    const history = useNavigate()

    const user=useSelector((state)=>state.User)
useEffect(()=>{
    if(user.auth && user.data.role==="user"){
        history("/")
    }
    if(user.auth && user.data.role==="driver"){
        history("/")
    }
})
    const dispatch = useDispatch()
    const bus = useSelector((state) => state.Bus_collection)
    const bus_state=useSelector((state)=>state.Bus_collection.Buses)
    const new_users=useSelector((state)=>state.Get_users)

    const Drivers=useSelector((state)=>state.D)
    const all_bookings=useSelector((state)=>state.Get_tic)
    useEffect(() => {
      
        dispatch(all_buses())

        
     
        
    
    
    
    }, [dispatch])
    useEffect(()=>{
        
            if( bus && !bus.Buses ){
                dispatch(Get_bus(init_sort))
                dispatch(UserRecords(init_sort))
               }

  
      
       

    },[dispatch,Get_bus])
  

    const Loadmore=() => {
        const Skip = sort.skip + sort.limit
        Setsort({skip: Skip})
        dispatch(Get_bus({sort, skip: Skip}))
    }



    ////////////////////////date////////////////
    const Current_d=new Date()
    /// dispatch actions  ********************************************************

    
  
    useEffect(()=>{
        dispatch(Get_booking())
    })


    useEffect(() => {
       
        dispatch(Get_Seats()) 
    })
useEffect(()=>{
    dispatch(Get_user())
  
})

useEffect(()=>{
    dispatch(Alldriver())
    
})

   
    return (
        <div data-aos="fade-up"
        data-aos-duration="3000" className="Load_buss">
          
            {  bus && bus.Buses ? 
             <div className="PANEL">
            
            
            <div className="userPanel">
                <div className="j_users" >
                <div data-aos="fade-up"
     data-aos-duration="3000" className="j_userhandler" >Hey! New users joined us! <EmojiEmotionsIcon  /></div>

{
    new_users && new_users.users ?
    new_users.users.slice(0,4).map((user)=>{
        return(
            <div data-aos="fade-up"
            data-aos-duration="3000">

<List   sx={{ width: '100%', maxWidth: 360 }}>
   <ListItem alignItems="flex-start" className="user_box">
     <ListItemIcon>
      <AccountCircleIcon fontSize="large" className="bus_icon"/>
     </ListItemIcon>
     <ListItemText
       primary={user.firstname + "" + user.lastname}
       secondary={
         <React.Fragment>
           <Typography
             sx={{ display: 'inline' }}
             component="span"
             variant="body2"
             color="text.primary"
           >
             email
           </Typography>
           {user.email}
         </React.Fragment>
       }
     />
       <ListItemIcon>
      <MessageIcon className="bus_icon"/>
     </ListItemIcon>
   </ListItem>
 
   <Divider/>
   </List>             
           </div>
        )
    }):null
}      
         
        
<div className="u_btn"> <Button onClick={()=>history("/operator/All_users")} style={{width:"30%"}}>view more</Button>   </div>
                </div>
                <div className="j_users" >
<div data-aos="fade-up"
     data-aos-duration="2000" className="j_userhandler" >New applicants on pending list! <EmojiEmotionsIcon /></div>
{
    Drivers && Drivers.AllD ?
    Drivers.AllD.slice(0,4).filter((user)=>user.status==="active").map((user)=>{
        return(<div data-aos="fade-up"
        data-aos-duration="2000">
           <List   sx={{ width: '100%', maxWidth: 360 }}>
          
               
                <ListItem alignItems="flex-start" className="user_box">
                  <ListItemIcon>
                   <AccountCircleIcon fontSize="large" className="bus_icon"/>
                  </ListItemIcon>
                  <ListItemText
                    primary={user.firstname + "" + user.lastname}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          email
                        </Typography>
                        {user.email}
                      </React.Fragment>
                    }
                  />
                    <ListItemIcon>
                   <HowToRegIcon className="bus_icon"/>
                  </ListItemIcon>
                  
                </ListItem>
                <Divider/>
   
              </List>

           
           </div>
        )
    }):null
}      
         
<div className="u_btn"> <Button onClick={()=>history("/operator/AllDrivers")} style={{width:"30%"}}>view more</Button>   </div>
                
                </div>
                </div>  
                <hr></hr>
                
                <div data-aos="fade-up"
     data-aos-duration="3000" className="table_description">
                   <h1 className="t_descrip">new bookings coming in <ReceiptLongIcon fontSize="large"/> </h1> 
               
                                    <Table className="table" striped bordered hover>
                                        <thead className="table_hd"
                                        
                                        >
                                            <tr style={
                                                {
                                                    fontFamily: "frekoda",
                                                
                                                }
                                            }>
                                                <th>Booked date</th>
                                    <th>Photo</th>
                                    <th>firstname</th>
                                    <th>lastname</th>
                                    <th>bus Number</th>
                                    <th>Seat number</th>
                                    <th>fare</th>
                                    <th>Start Point</th>
                                    <th>Destination</th>
                                    <th>departure</th>
                                    

        
                                            </tr>
        
                                        </thead>
                                        <tbody className="table_body"
                                        >
                                            {
                                                  
                                                  all_bookings  && all_bookings.bookings ?
                                 
                                                  all_bookings.bookings.slice(0,10).map((ticket) => {
                                                        return (
                                                            <tr
                                                               key={ticket._d}
                                                            >
                                                                 <td>{moment(ticket.createdAt).format("LL")}</td>
                                                    <td><Avatar src={ticket.photo}  style={{width:"60px",height:"60px",border:"1px solid red"}}/></td>
                                                    
                                                    <td>{
                                                        ticket.firstname
                                                    } </td>
                                                    <td>{
                                                        ticket.lastname
                                                    }</td>
                                                    <td> {
                                                        ticket.busNumber
                                                    } </td>
                                                     <td> {
                                                        ticket.seatnumber
                                                    } </td>
                                                    
                                                    <td> GH₵ {ticket.fare}.00</td>
                                                    <td>{ticket.startpoint}</td>
                                                    <td>{ticket.destination}</td>
                                                    <td>{moment(ticket.departure).format("LL")}</td>
    
                                                  

                                                               
                                                   
                                                 
    
                                                  
                                        
                                                            </tr>
                
                                                        )
                                                    }) 
                                                   
                                                    :null}
                                         
                                         </tbody>
        
        
                                    </Table>
                                    
        
                             
                                <Button onClick={()=>history("/operator/all_books")} style={{width:"40%",marginTop:"20px"}}>Explore more</Button>
                </div>
            
                       
          
          <hr></hr>

          <div  className="table_description">
                   <div data-aos="fade-up"
     data-aos-duration="2000" className="t_descrip">buses travelling today <DepartureBoardIcon fontSize="large"/> </div> 
                                   
                                   
                                    <Table striped bordered hover>
                                        <thead className="table_hd">
                                            <tr style={
                                                {
                                                    fontFamily: "frekoda",
                                                    fontSize: "20px"
                                                }
                                            }>
                                              
    
                                                <th>Photo</th>
                                                <th>Bus Name</th>
                                                <th>Bus Number</th>
                                                <th>fare</th>
                                                <th>Start Point</th>
                                                <th>Destination</th>
                                                <th>departure</th>
                                                <th>Driver name</th>
                                                <th>Options</th>
        
                                            </tr>
        
                                        </thead>
                                        <tbody className="table_body"
                                        >
                                            {
                                                  
                                                  mainbuses && mainbuses.bus ? 
                                                  mainbuses.bus.filter((i)=>moment(i.work_days[0]).format("LL")===moment(Current_d).format("LL")).map((state) => {
                                                        
                                                            return (
                                                                <tr key={
                                                                    state._id
                                                                }>
    
                                                                 
                                                                   
                                                                    <td><img src={state.image}  style={{width:"60px",height:"50px"}}/></td>
                                                                    
                                                                    <td>{
                                                                        state.name
                                                                    } </td>

                                                                    <td>{
                                                                        state.busNumber 
                                                                    }</td>
                                                                    <td> {
                                                                        state.fare
                                                                    } </td>
                                                                    <td>{state.startpoint}</td>
                                                                    <td>{state.destination}</td>
                                                                    <td>{moment(state.work_days[0]).format("HH:mm A")}</td>
                                                                    <td>{ state && state.driver[0]?
                                                                    <>{state.driver[0].username}</>:null}</td>
                    
                                                                  
                                                                    <td className="table_options">
                                                                       
                                                                        <EditIcon className="t_option_e"
                                                                            onClick={()=>
                                                                                history(`/operator/Bus/${state._id}`)   
                                                                            }/></td>
                                                                </tr>
                    
                                                            )
                                                         
                                                        
                                                    }) 
                                                   
                                                    :null}
                                         
                                         </tbody>
        
        
                                    </Table>
                                    <Button style={{width:"40%"}} onClick={()=>history("/operator/allbuses") }>view all buses</Button>
        
                            
                </div>
                
        
        
                    </div>
                    : <div style={{width:"100%",height:"100%"}}>{Loading()}</div> 
             }
 
    

        </div>


    )
}

export default Load_Home
