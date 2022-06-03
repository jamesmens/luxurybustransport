
import React, {useState, useEffect,useReducer} from "react";
import {Navigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {Get_driver,Alldriver} from "../../store/actions/drivers_action"
import {Get_user} from "../../store/actions/users_action"
import {Get_bus, Get_Seats} from "../../store/actions/buses_action";
import {Get_bus_details} from "../../store/actions/buses_action"
import {All_tickets, Get_booking} from "../../store/actions/bookings"
import { useFormik, FormikProvider, FieldArray } from "formik";
import DatePicker from "react-datepicker";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-datepicker/dist/react-datepicker.css";


import {Loading} from "../ultils/Loading"
import {
    Modal,ButtonGroup,ButtonToolbar,InputGroup,FormControl,Button

} from  "react-bootstrap"

/**    mui imports */
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FilterListIcon from '@mui/icons-material/FilterList';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageIcon from '@mui/icons-material/Message';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import moment from "moment";
import {
    IconButton,
    List,
    ListItemAvatar,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    TextField,
    Typography
} from "@material-ui/core";

import {Table,Pagination} from "react-bootstrap"
import Moment from "react-moment"
import { LinkContainer} from "react-router-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-time-picker';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditIcon from '@mui/icons-material/Edit';
import { borderRadius } from "@mui/system";
const All_bookings = (props) => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    const init_sort={sortBy:"_id",order:"desc",limit:5,skip:0}

    const [sort,Setsort] =useReducer((state, new_sort)=>({...state,new_sort}),init_sort)
const user_date=(d)=>{
  return  moment(d).format("DD"-"MM"-"YY")
}

////// selectors
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
   
    const all_bookings=useSelector((state)=>state.tickets)

   

    const Loadmore=() => {
        const Skip = sort.skip + sort.limit
        Setsort({skip: Skip})
        dispatch(All_tickets({sort, skip: Skip}))
    }



    ////////////////////////date////////////////
    const Current_d=new Date()
    /// dispatch actions  ********************************************************

    
  
    useEffect(()=>{
        dispatch(Get_booking())
        
    })
    useEffect(()=>{
        if(all_bookings && !all_bookings.books){
            dispatch(All_tickets(init_sort))
           
           

        }
       
    },[dispatch,all_bookings])
//////////////////filter
const  [data_s,setdata]=useState("all")
const [getvalue,setvalue]=useState();
const [InVite,setInvite]=useState(false)
const [Time,onChangeT]=useState(new Date())
const bookt=useSelector((state)=>state.Get_tic)
   const Filterdate=(data)=>{
if(data_s==="search"){
    return data.filter((item)=>{
        if(item && item.busNumber ) {
                return  item.busNumber.indexOf(getvalue) >-1 || item._id.indexOf(getvalue)>-1 || item.email.indexOf(getvalue)>-1 || item.firstname.indexOf(getvalue)>-1 ||item.lastname.indexOf(getvalue)>-1 || item.destination.indexOf(getvalue)>-1 || item.startpoint.indexOf(getvalue)>-1
            }
        
    }) 
} 
if(data_s==="departure"){
    return data.filter((item)=> moment(item.departure).format("LL")===moment(Time).format("LL"))
}

if(data_s ==="all" ){
    return data
}
if(data_s==="today"){
    return data.filter((item)=>moment(item.departure).format("LL")===moment(Current_d).format("LL"))

}

   
}
///////////////

    return (
        <div className="Load_buss">
          
            {  all_bookings  && all_bookings.books ? 
             <div className="PANEL">
                  <div className="filter_plate">
            <p style={{fontFamily:"frekoda", fontWeight:"bold" ,margin:"0 10px 0 0 "}}>Bookings Board </p>
              <ListItemIcon><FilterListIcon fontSize="large"/></ListItemIcon>
              <div>Filter by</div>
              <Button onClick={()=>setdata("all")} style={{margin:"20px" ,padding:"10px"}}>Default</Button>
           
              <Button onClick={()=>setdata("today")} style={{margin:"5px" ,padding:"10px"}}>Today</Button>
             <div onClick={()=>setdata("departure")} style={{border:"1px solid black",borderRadius:"10px" ,margin:"10px",}}>
             <DatePicker selected={Time} style={{width:"80px"}} onChange={(date) => onChangeT(date)} />
            </div>
              <InputGroup style={{width:"20%", margin:"20px"}}  >
                                  
                                    <FormControl onChange={(e)=>setvalue(e.target.value)} style={{width:"500px",padding:"10px"}} type="text" aria-label="Small" aria-describedby="inputGroup-sizing-lg" placeholder="Search ..."></FormControl>
                                </InputGroup>
                                <Button onClick={()=>setdata("search")}>Search</Button></div>
            
                
                <div  data-aos="fade-up"
                        data-aos-duration="2000" className="table_description">
                   <h1 data-aos="fade-up"
                        data-aos-duration="2000" className="t_descrip">new bookings coming in <ReceiptLongIcon fontSize="large"/> </h1> 
               
                                    <Table className="table" striped bordered hover>
                                        <thead className="table_hd"
                                        
                                        >
                                            <tr style={
                                                {
                                                    fontFamily: "frekoda",
                                                    fontSize: "20px"
                                                }
                                            }>
                                                <th>Booked date</th>
                                                <th>ID</th>
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
                                                  
                                                  all_bookings  && all_bookings.books ?
                                 
                                                  Filterdate(all_bookings.books).map((ticket,i) => {
                                                        return (
                                                            <tr data-aos="fade-up" key={i}
                                                            data-aos-anchor-placement="center-bottom"
                                                            
                                                            >
                                                         
                                                                 <td>{moment(ticket.createdAt).format("LL")}</td>
                                                   <td>{ticket._id}</td>
                                                    <td><img src={ticket.photo}  style={{width:"60px",height:"50px"}}/></td>
                                                    
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
                                    
        {
            bookt && bookt.bookings ?
            <>
            {
                all_bookings && all_bookings.books ?
                <>
                {
                    bookt.bookings.length > all_bookings.books.length ?
                    <Button style={{width:"90%",marginTop:"20px"}} onClick={()=>Loadmore()}>Explore more</Button>:null


                }
                </>

               :null

            }
            </>
           :null

        }
                             
                               
                </div>
            
                       
          
          <hr></hr>

         
                
        
        
                    </div>
                    : <div style={{width:"100%",height:"100%"}}>{Loading()}</div> 
             }
 
    

        </div>


    )
}

export default All_bookings
