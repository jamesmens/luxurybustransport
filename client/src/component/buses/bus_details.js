import React, {useEffect, useState} from "react"
import FmdBadIcon from '@mui/icons-material/FmdBad';
import moment from "moment";
import PanoramaPhotosphereSelectIcon from '@mui/icons-material/PanoramaPhotosphereSelect'
import styled from "styled-components"
import {Loading} from "../ultils/Loading"
import IconButton from '@material-ui/core/IconButton';
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
import {Get_bus_details, Reset_seat,Unactivebus,Activebus,Delete_bus} from "../../store/actions/buses_action"
import Update_Bus from "./update_bus";
import {Button} from "react-bootstrap";
import {Get_driver} from "../../store/actions/drivers_action"
import { ShowToast } from "../ultils/tools";
import { notify_remove } from "../../store/actions";
const Bus_detail = () => {
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
    const init_sort={page:1,limit:1000, skip:0}
    const params = useParams()
    const dispatch = useDispatch()
    const Drivers=useSelector((state)=>state.Drivers)
    const bus = useSelector((state) => state.bus_detail)
    const notification=useSelector((i)=>i.Notification)
    const [action, set_action] = useState(true)

    useEffect(() => {
        dispatch(Get_bus_details(params.id))
        if(notification && notification.success){
            ShowToast("SUCCESS",notification.msg)
            dispatch(notify_remove())
        }
    })
    useEffect(()=>{
        if(Drivers && !Drivers.AllDriverr){
          dispatch(Get_driver(init_sort))
        }
        
      },[dispatch])
      

    let History=useNavigate()

//////////////// booked seat
const Bookedseat=(seats)=>{
    const count =seats.filter((s)=>s.status==="booked")
    return count.length
}
    // ///////////funx=ctions
    const seat_th = () => {
        return (
            <> {
                bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice(0, (bus.bus_d.seats_no.length) / 4).map((seats,i) => {
                    return (

                        <div className="seat_th" key={i}>
                            <div className={seats.status} onClick={
                                    () => {
                                        alert(seats.no)
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

                        <div className="seat_2th" key={i}>
                            <div className={seats.status} onClick={
                                    () => {
                                        alert(seats.no)
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

                            <div className="seat_3th" key={i}>
                                <div className={seat.status} onClick={
                                    () => {
                                        alert(seat.no)
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

                        <div  className="seat_3th" key={i}>
                            <div className={seats.status} onClick={
                                () => {
                                   
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

                        <div className="seat_4th" key={i}>
                            <div className={seats.status} onClick={
                                    () => {
                                        alert(seats.no)
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
    const IMG=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;

    height:300px;
    width:100%;
    border:1px solid white;
    border-radius: 25px;
    `


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
         <ListItemIcon onClick={()=>History("/operator/adminhome")}  style={{margin:"50px"}} className={classes.back}><ArrowCircleLeftIcon className="back_btn"/></ListItemIcon>
     
         { 

            bus && bus.bus_d  ? <>
           
            {
                action ?
              <div>
                  
                   {
                    bus.bus_d.image === "string" ?
                    
                    <IMG><IconButton className={classes.Icon_IMG}> <BusAlertIcon /> </IconButton>  <div style={{padding:"100px 0 0 0",fontFamily:"Roboto",fontSize:"50px"}}>Click on Update to modify Bus!<FmdBadIcon fontSize="large" style={{margin:"0 0 0 10px"}}/> </div></IMG> :
                    <IMG><img src={bus.bus_d.image}></img></IMG>

                }
              </div>
            :null


            }


                <Button className="bus_update_bt t-20"
                    onClick={
                        () => set_action(!action)
                }>{
                    action ?
                 <> Update Bus</>  :<>Bus details</>
                }
                    </Button>
        {
            action ?
            <select class="form-select" aria-label="Default select example" className='W_selector' style={{margin:"10px", padding:"6px",border:"2px solid blue", borderRadius:"5px", boxShadow:"1px 2px 3px 1px blue" ,width:"200px",height:"50px"}}>
            <option selected style={{ opacity: "0.5"}}>select work days</option>
            {
                bus.bus_d.work_days.map((day)=>{
                    return(
                        <>
                        <option value={day}>{moment(day).format("LLLL")}
                            </option></>

                    )
                })
            }

          </select>
:null

        }


                {
                action === true ?
                <div className="Detail_screen">
                <div className="Detail_panel">

                    <div className="bus_record">
                        <ListItem>
                            <ListItemIcon>
                                <DirectionsCarIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black",fontFamily:"Frekoda",fontWeight:"bold"}}
                            > <span style={{margin:"0 50px 0 50px"}}>Bus Name :</span>{
                                bus.bus_d.name
                            }</ListItemText>

                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                < BusinessIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}
                            > <span style={{margin:"0 50px 0 50px"}}>Company :</span>{
                                bus.bus_d.company
                            }</ListItemText>

                        </ListItem>

                        <Divider/>
                        <ListItem>
                            <ListItemIcon>
                                <PersonRemoveAlt1Icon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}><span style={{margin:"0 50px 0 50px"}}>Driver :</span>
                            {bus && bus.bus_d.driver[0] ? <>{bus.bus_d.driver[0].username} </>  :  <>null</>                       }</ListItemText>

                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemIcon>
                                <MoneyIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}><span style={{margin:"0 50px 0 50px"}}>Fare : </span> GH₵{
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
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}><span style={{margin:"0 50px 0 50px"}}>Bus number : </span>{
                                bus.bus_d.busNumber
                            }</ListItemText>


                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EventSeatIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}> <span style={{margin:"0 50px 0 50px"}}>available Seats : </span>{
                                bus.bus_d.seatsAvailable
                            }</ListItemText>

                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PinDropIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}> <span style={{margin:"0 50px 0 50px"}}>Start point: </span><p style={{fontFamily:"Fredoka" ,fontSize:"20px" ,margin:"0 50px 0 50px"}}>{
                                bus.bus_d.startpoint
                            }</p></ListItemText>


                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssistantPhotoIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}> <span style={{margin:"0 50px 0 50px"}}>Destination: </span><p style={{fontFamily:"Fredoka", margin:"0 50px 0 50px" ,fontSize:"20px"}}>{
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
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}>  <span style={{margin:"0 50px 0 50px"}}>boarding Points: </span>{
                                bus.bus_d.boardingPoints.map((item,index) => (
                                    <div  style={{margin:"0 50px 0 50px"}} key={index}><Chip color="primary"
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
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}>  <span style={{margin:"0 50px 0 50px"}}>dropping Points : </span>{
                                bus.bus_d.droppingPoints.map((item,index) => (
                                    <div  style={{margin:"0 50px 0 50px"}}  key={index}><Chip color="primary"
                                            label={
                                                `${item}`
                                            }/></div>
                                ))
                            }</ListItemText>

                        </ListItem>
                        <Divider/>


                        <ListItem>
                            <ListItemIcon>
                                <AirlineSeatLegroomExtraIcon  className="bus_icon"  />
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black",fontFamily:"Frekoda",fontWeight:"bold"}}>  <span style={{margin:"0 50px 0 50px"}}> BookedSeat: </span>{
                                Bookedseat(bus.bus_d.seats_no)
                            }</ListItemText>

                        </ListItem>


                    </div>
                    <div style={{height:"800px",width:"1px",backgroundColor:"rgb(185, 182, 182)"}}></div>
                    <div className="bus_c">
                        <div className="bus_mode">


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
                        <div className=" seat_des" style={{margin:"10px"}}>
                            <div className="seat_box" style={{margin:"10px"}}>
                                <div className='seat_f' style={{margin:"10px"}}></div>
                                <div className='seat_booked' style={{margin:"10px"}}> </div>

                                <div className='seat_selected' style={{margin:"10px"}}></div>
                            </div>
                            <div className="seat_p">
                                <div style={
                                    {fontSize: "fredoka"}
                                }>Available</div>
                                <div>Booked</div>
                                <div>selected</div>
                            </div>


                        </div>
                        <div className="hot_key">
                            <p>HOT KEYS</p>
                            <div>
                                {
                                    bus.bus_d.ava==="true" ?
                                    <Button onClick={()=>dispatch(Unactivebus(`${bus.bus_d._id}`))} style={{margin:"10px"}}>stop work</Button> :
                                    <Button style={{margin:"10px"}} onClick={()=>dispatch(Activebus(`${bus.bus_d._id}`))} >resume work</Button>
                                   

                                    
                                }
                           
                           
                            <Button onClick={()=>dispatch(Reset_seat(`${bus.bus_d._id}`))} style={{margin:"10px"}}>Reset Seats</Button>
                            <Button color="secondary" style={{margin:"10px"}} onClick={()=>dispatch(Delete_bus(`${bus.bus_d._id}`))} >DELETE BUS</Button>
                            </div>
                           
                        </div>
                    </div>

                </div>
                </div> : <Update_Bus bus={bus}
                    seat_2th={
                        seat_2th()
                    }/>
            } </> :  <div style={{width:"100%",height:"100%"}}>{Loading()}</div>
        } </div>
    )
}
export default Bus_detail
