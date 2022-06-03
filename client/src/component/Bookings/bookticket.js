import React, {useEffect, useState,useRef} from "react"
import FmdBadIcon from '@mui/icons-material/FmdBad';
import moment from "moment";
import PanoramaPhotosphereSelectIcon from '@mui/icons-material/PanoramaPhotosphereSelect'
import styled from "styled-components"
import {Loading} from "../ultils/Loading"
import IconButton from '@material-ui/core/IconButton';
import AOS from "aos";
import "aos/dist/aos.css";
import { makeStyles } from '@material-ui/core/styles';



import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import {
    List,
    Select,
    MenuItem,
    Drawer,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    TextField,
    createTheme,
    ThemeProvider,
    Box
} from "@material-ui/core";
import InputLabel from '@mui/material/InputLabel';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import ChairIcon from '@mui/icons-material/Chair';
import WorkIcon from '@mui/icons-material/Work';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AirlineSeatLegroomReducedIcon from '@mui/icons-material/AirlineSeatLegroomReduced';
import EighteenMpIcon from '@mui/icons-material/EighteenMp';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import MoneyIcon from '@mui/icons-material/Money';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

import AirlineSeatLegroomExtraIcon from '@mui/icons-material/AirlineSeatLegroomExtra';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import BusinessIcon from '@mui/icons-material/Business';

import {useDispatch, useSelector} from "react-redux"

import BusAlertIcon from '@mui/icons-material/BusAlert';
import {useParams,useNavigate} from "react-router-dom"
import {Get_bus_details,Selectseat,Free_Seat,BookSeat} from "../../store/actions/buses_action"

import {Button} from "react-bootstrap";
import { Create_Cart,cart_remove } from "../../store/actions/Cart";
const Bookticket = (e) => {
    const User=useSelector((state)=>state.User)
    const history=useNavigate()
    const userd=useSelector((state)=>state.User)
    useEffect(()=>{
      if(userd && userd.auth !==true){
        history("/")
  
  
      }
      if(userd && userd.data.role ==="admin"){
        history("/")
  
      }
      if(userd && userd.data.role ==="driver"){
        history("/")
  
      }
  
    })
   
    const params = useParams()
    const dispatch = useDispatch()
    const bus = useSelector((state) => state.bus_detail)
    const cartdata=useSelector((state)=>state.Carts)
    const [action, set_action] = useState(true)
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
    useEffect(() => {
        dispatch(Get_bus_details(params.id))
    })
    

    let History=useNavigate()
const [seat_select,setoption]=useState("")
//////////////// booked seat
const Bookedseat=(seats)=>{
    const count =seats.filter((s)=>s.status==="booked")
    return count.length
}



const Book=(e)=>{
    let data=[]
    if(User && User.auth===true){
        if(bus && bus.bus_d){
            let user=User.data;
            data.push({"username":user.username,
            "email":user.email
        ,"address":user.address,"age":user.age,
        "busNumber":bus.bus_d.busNumber,
        "seatnumber":e.no,
        "photo":user.photo,
        id:bus.bus_d._id,
       "firstname":user.firstname,
"lastname":user.lastname,
        "departure":bus.bus_d.work_days[0],
        "startpoint":bus.bus_d.startpoint,
        "destination":bus.bus_d.destination,
        "fare":bus.bus_d.fare

    },
        )  
       
        }
      
    }
    return data
    

}








///////////////////// get seat state


    // ///////////funx=ctions
    const seat_th = () => {
        return (
            <> {
                bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice(0, (bus.bus_d.seats_no.length) / 4).map((seats,i) => {
                    return (

                        <div  className="seat_th" key={i}>
                            <div   className={seats.status} onClick={
                                    () => {
                                     
                                        if(seats.status==="free"){
                                            dispatch(Selectseat(bus.bus_d._id,seats.no));
                                           
                                            setoption(seats.no)
                                            dispatch(Create_Cart(Book(seats)))

                                            if(seat_select !== ""){
                                                dispatch(Free_Seat(bus.bus_d._id,seat_select))

                                            }
                                            
                                        }
                                        if(seats.status==="selected"){
                                            dispatch(Free_Seat(bus.bus_d._id,seats.no))

                                            setoption("")
                                            dispatch(cart_remove())

                                        }
                                       
                                    }
                                }><ChairIcon fontSize="medium"
                                    style={
                                        {
                                            height: "35px",
                                            width: "35px"
                                        }
                                    }/></div>

                        </div>


                    )
                }) : null
            } </>
        )
    }
    const seat_2th = () => {
        return (
            <> {
                bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice(((bus.bus_d.seats_no.length) / 4) + 1, (2 * ((bus.bus_d.seats_no.length)/ 4) + 1)).map((seats,i) => {
                    return (

                        <div   className="seat_2th" key={i}>
                            <div className={seats.status}onClick={
                                    () => {
                                        
                                        if(seats.status==="free"){
                                            dispatch(Selectseat(bus.bus_d._id,seats.no))
                                            setoption(seats.no)
                                            dispatch(Create_Cart(Book(seats)))
                                           
                                            if(seat_select !== ""){
                                                dispatch(Free_Seat(bus.bus_d._id,seat_select))

                                            }
                                        }
                                        if(seats.status==="selected"){
                                            dispatch(Free_Seat(bus.bus_d._id,seats.no))
                                            setoption("")
                                            dispatch(cart_remove())

                                        }
                                    }
                                }
                            >
                                <ChairIcon fontSize="medium"
                                    style={
                                        {
                                            height: "35px",
                                            width: "35px"
                                        }
                                    }/></div>
                        </div>


                    )
                }) : null
            } </>
        )

    }
    const midseat = () => {
        return (
            <> {
                bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice((bus.bus_d.seats_no.length) / 2, (bus.bus_d.seats_no.length) / 2 + 1).map((seat,i) => {
                    return (
                        <>

                            <div   className="seat_3th" key={i}>
                                <div className={seat.status} onClick={
                                    () => {
                                        
                                        if(seat.status==="free"){
                                            dispatch(Selectseat(bus.bus_d._id,seat.no))
                                            dispatch(Create_Cart(Book(seat)))
                                            setoption(seat.no)
                                            if(seat_select !== ""){
                                                dispatch(Free_Seat(bus.bus_d._id,seat_select))
                                               

                                            }
                                        }
                                        if(seat.status==="selected"){
                                            dispatch(Free_Seat(bus.bus_d._id,seat.no))
                                            setoption("")
                                            dispatch(cart_remove())
                                        }
                                    }
                                }>
                                    <ChairIcon fontSize="medium"
                                        style={
                                            {
                                                height: "35px",
                                                width: "35px"
                                            }
                                        }/></div>
                            </div>

                        </>
                    )
                }) : null
            } </>
        )
    }
    const seat_3th = () => {
        return (
            <> {
                bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice(2 * (((bus.bus_d.seats_no.length))/ 4) + 1, (3 * ((bus.bus_d.seats_no.length) / 4) + 1)).map((seats,i) => {
                    return (

                        <div   className="seat_3th" key={i}>
                            <div className={seats.status} onClick={
                                () => {
                    
                                    if(seats.status==="free"){
                                        dispatch(Selectseat(bus.bus_d._id,seats.no))
                                        dispatch(Create_Cart(Book(seats)))
                                        setoption(seats.no)
                                        if(seat_select !== ""){
                                            dispatch(Free_Seat(bus.bus_d._id,seat_select))
                                            

                                        }
                                    }
                                    if(seats.status==="selected"){
                                        dispatch(Free_Seat(bus.bus_d._id,seats.no))
                                       
                                        setoption("")
                                        dispatch(cart_remove())
                                    }
                                }
                            }>
                                <ChairIcon fontSize="medium"
                                    style={
                                        {
                                            height: "35px",
                                            width: "35px"
                                        }
                                    }/></div>
                        </div>


                    )
                }) : null
            } </>
        )

    }
    const seat_4th = () => {
        return (
            <> {
                bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice(3 * ((bus.bus_d.seats_no.length) / 4) + 1, (4 * ((bus.bus_d.seats_no.length)-1 / 4) + 1)).map((seats,i) => {
                    return (

                        <div   className="seat_4th" key={i}>
                            <div className={seats.status} onClick={
                                    () => {
                                       
                                        if(seats.status==="free"){
                                            dispatch(Selectseat(bus.bus_d._id,seats.no))
                                            dispatch(Create_Cart(Book(seats)))
                                            setoption(seats.no)
                                            if(seat_select !== ""){
                                                dispatch(Free_Seat(bus.bus_d._id,seat_select))

                                            }
                                        }
                                        if(seats.status==="selected"){
                                            dispatch(Free_Seat(bus.bus_d._id,seats.no))
                                            setoption("")
                                            dispatch(cart_remove())

                                        }
                                    }
                                }>
                                <ChairIcon fontSize="medium"
                                    style={
                                        {
                                            height: "35px",
                                            width: "35px"
                                        }
                                    }/></div>
                        </div>


                    )
                }) : null
            } </>
        )

    }
    
    const useStyles = makeStyles((theme) => ({
        Icon_IMG: {
          '& svg': {
            fontSize: 250,

          },
         
        },
        back:{
            '& svg': {
                fontSize: 50,
                color:"blue",
                backgroundColor:"white"
                
    
              },
              
        }

      }));
      const classes=useStyles()
    return (
        <div data-aos="fade-up"
        data-aos-duration="3000" > 
         <ListItemIcon onClick={()=>History("/")}  style={{margin:"10px"}} className={classes.back}><ArrowCircleLeftIcon className="back_btn"/></ListItemIcon>
     
         { 

            bus && bus.bus_d  ? <>
                <div className="Detail_screen">
                    <div className="detail_screen_s ">
                    <div >
                  
                  {
                   bus.bus_d.image === "string" ?
                   
                  null :
                   <div data-aos="zoom-in-right" ><img  className="IMG IMGS" src={bus.bus_d.image}></img></div>

               }
             </div>
            
                    </div>
               
                <div data-aos="fade-up"
                        data-aos-duration="800"
                className="Detail_panel">
              
                <div className="bus_record">
              

                        
                        <ListItem>
                            <ListItemIcon>
                                <PersonRemoveAlt1Icon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}><span style={{margin:"10px"}}>Driver :</span>
                            {bus && bus.bus_d.driver[0] ? <>{bus.bus_d.driver[0].username} </>  :  <>null</>                       }</ListItemText>

                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemIcon>
                                <MoneyIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}><span style={{margin:"10px"}}>Fare : </span> GH₵{
                                bus.bus_d.fare
                            }</ListItemText>

                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemIcon>
                                <EighteenMpIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}><span style={{margin:"10px"}}>Bus number : </span>{
                                bus.bus_d.busNumber
                            }</ListItemText>


                        </ListItem>
                       
                        
                        <ListItem>
                            <ListItemIcon>
                                <PinDropIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}> <span style={{margin:"10px"}}>Start point: </span><p style={{fontFamily:"Fredoka" ,fontSize:"20px" ,margin:"0 50px 0 50px"}}>{
                                bus.bus_d.startpoint
                            }</p></ListItemText>


                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssistantPhotoIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}> <span style={{margin:"10px"}}>Destination: </span><p style={{fontFamily:"Fredoka", margin:"0 50px 0 50px" ,fontSize:"20px"}}>{
                                bus.bus_d.destination
                            }</p></ListItemText>


                        </ListItem>
                        <Divider/>

                        <Divider/>
                        <ListItem>
                            <ListItemIcon>
                                <AccessibilityIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black",fontFamily:"Frekoda",fontWeight:"bold"}}>  <span style={{margin:"10px"}}>boarding Points: </span>{
                                bus.bus_d.boardingPoints.map((item,index) => (
                                    <div  style={{margin:"5px 0 5px 40px ",display:"flex",flexDirection:"column",width:"40%"}} key={index}><Chip color="primary"
                                            label={
                                                `${item}`
                                            }/></div>
                                ))

                            }</ListItemText>

                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemIcon>
                                <AltRouteIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}>  <span style={{margin:"10px"}}>dropping Points : </span>{
                                bus.bus_d.droppingPoints.map((item,index) => (
                                    <div  style={{margin:"5px 0 5px 40px ",display:"flex",flexDirection:"column",width:"40%"}}  key={index}><Chip color="primary"
                                            label={
                                                `${item}`
                                            }/></div>
                                ))
                            }</ListItemText>

                        </ListItem>
                        <Divider/>





                    </div>
                   
                    <div
                     data-aos="fade-up"
                     data-aos-duration="800" className="bus_c">
                    <div className=" seat_des">
                            <div className="seat_box">
                                <div className='seat_f'></div>
                                <div className='seat_booked'></div>

                                <div className='seat_selected'></div>
                            </div>
                            <div className="seat_p">
                                <div style={
                                    {fontSize: "fredoka"}
                                }>Available</div>
                                <div>Booked</div>
                                <div>selected</div>
                            </div>


                        </div>
                        <div
                        className="bus_mode">


                            <div className="Grid_seat">
                                <div>{
                                    seat_th()
                                }</div>

                                <div>{
                                    seat_2th()
                                }</div>
                                <div>{
                                    midseat()
                                }</div>
                                <div>{
                                    seat_3th()
                                }</div>
                                <div>{
                                    seat_4th()
                                }</div>
                                <div className="driver_wheel">

                                    <PanoramaPhotosphereSelectIcon fontSize="medium"
                                        style={
                                            {color: "green"}
                                        }/>
                                </div>


                            </div>


                        </div>
                      
                    </div>

                </div>
                </div> </> :  <div style={{width:"100%",height:"100%"}}>{Loading()}</div>
        } </div>
    )
}
export default Bookticket
