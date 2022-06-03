import React, {useEffect, useState,useRef} from "react"


import PanoramaPhotosphereSelectIcon from '@mui/icons-material/PanoramaPhotosphereSelect'

import {Loading} from "../ultils/Loading"

import AOS from "aos";
import "aos/dist/aos.css";
import { makeStyles } from '@material-ui/core/styles';

import Countdown from 'react-countdown';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

import {
  
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
  
} from "@material-ui/core";

import ChairIcon from '@mui/icons-material/Chair';
import WorkIcon from '@mui/icons-material/Work';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AirlineSeatLegroomReducedIcon from '@mui/icons-material/AirlineSeatLegroomReduced';
import EighteenMpIcon from '@mui/icons-material/EighteenMp';
import AltRouteIcon from '@mui/icons-material/AltRoute';


import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';


import {useDispatch, useSelector} from "react-redux"




import {Button} from "react-bootstrap";
const Driverbus = () => {
    const dispatch = useDispatch()
    const account = useSelector((state) => state.User)
   
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
 
    

 

//////////////// booked seat










///////////////////// get seat state


    // ///////////funx=ctions
    const seat_th = () => {
        return (
            <> {
                account.data && account.data.bus[0] ?
                
                account.data.bus[0].seats_no.slice(0, (account.data.bus[0].seats_no.length) / 4).map((seats,i) => {
                    return (

                        <div className="seat_th" key={i}>
                            <div   className={seats.status} ><ChairIcon fontSize="medium"
                                    style={
                                        {
                                            height: "35px",
                                            width: "35px"
                                        }
                                    }/></div>

                        </div>


                    )
                }) 
         :null   }</>
        )
    }
    const seat_2th = () => {
        return (
            <> { account.data && account.data.bus[0] ?
                account.data.bus[0].seats_no.slice(((account.data.bus[0].seats_no.length) / 4) + 1, (2 * ((account.data.bus[0].seats_no.length)/ 4) + 1)).map((seats,i) => {
                    return (

                        <div   className="seat_2th" key={i}>
                            <div className={seats.status}
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
                })
     :null} </>
           )

    }
    const midseat = () => {
        return (
            <> {  account.data && account.data.bus[0] ?
                account.data.bus[0].seats_no.slice((account.data.bus[0].seats_no.length) / 2, (account.data.bus[0].seats_no.length) / 2 + 1).map((seat,i) => {
                    return (
                        <>

                            <div   className="seat_3th" key={i}>
                                <div className={seat.status} >
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
                })
       :null     } </>
        )
    }
    const seat_3th = () => {
        return (
            <> {  account.data && account.data.bus[0] ?
                account.data.bus[0].seats_no.slice(2 * (((account.data.bus[0].seats_no.length))/ 4) + 1, (3 * ((account.data.bus[0].seats_no.length) / 4) + 1)).map((seats,i) => {
                    return (

                        <div   className="seat_3th" key={i}>
                            <div className={seats.status}>
                                <ChairIcon fontSize="medium"
                                    style={
                                        {
                                            height: "35px",
                                            width: "35px"
                                        }
                                    }/></div>
                        </div>


                    )
                }) 
          :null  } </>
        )

    }
    const seat_4th = () => {
        return (
            <> {  account.data && account.data.bus[0] ?
                account.data.bus[0].seats_no.slice(3 * ((account.data.bus[0].seats_no.length) / 4) + 1, (4 * ((account.data.bus[0].seats_no.length)-1 / 4) + 1)).map((seats,i) => {
                    return (

                        <div   className="seat_4th" key={i}>
                            <div className={seats.status} >
                                <ChairIcon fontSize="medium"
                                    style={
                                        {
                                            height: "35px",
                                            width: "35px"
                                        }
                                    }/></div>
                        </div>


                    )
                })
      :null      } </>
        )

    }
    
    const useStyles = makeStyles((theme) => ({
        Icon_IMG: {
          '& svg': {
            fontSize: 50,

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
        
     
         { 

            account && account.data.bus[0]  ? <>
                <div className="Detail_screen">
                    <div className="detail_screen_s ">
                    <div >
                  
                  {
                  account.data.bus[0].image === "string" ?
                   
                  null :
                   <div data-aos="zoom-in-right" className="IMGD"><img src={account.data.bus[0].image}></img></div>

               }
             </div>
            
               
                    </div>
               
                <div className="Detail_panel">
              
                <div className="bus_record">
              

                      
                       
                       <div>
                       <ListItem>
                            <ListItemIcon>
                                <EighteenMpIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}><span style={{margin:"10px"}}>Bus number : </span>{
                                account.data.bus[0].busNumber
                            }</ListItemText>


                        </ListItem>
                       
                        
                        <ListItem>
                            <ListItemIcon>
                                <PinDropIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}> <span style={{margin:"10px"}}>Start point: </span><p style={{fontFamily:"Fredoka" ,fontSize:"20px" ,margin:"0 50px 0 50px"}}>{
                                account.data.bus[0].startpoint
                            }</p></ListItemText>


                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssistantPhotoIcon  className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}> <span style={{margin:"10px"}}>Destination: </span><p style={{fontFamily:"Fredoka", margin:"0 50px 0 50px" ,fontSize:"20px"}}>{
                                account.data.bus[0].destination
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
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}>  <span style={{margin:"10px"}}>boarding Points: </span>{
                                account.data.bus[0].boardingPoints.map((item,index) => (
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
                                <AltRouteIcon className="bus_icon"/>
                            </ListItemIcon>
                            <ListItemText
                            disableTypography
                            style={{color:"black", fontFamily:"Frekoda",fontWeight:"bold"}}>  <span style={{margin:"10px"}}>dropping Points : </span>{
                                account.data.bus[0].droppingPoints.map((item,index) => (
                                    <div  style={{margin:"5px 0 5px 40px ",display:"flex",flexDirection:"column",width:"40%"}}  key={index}><Chip color="primary"
                                            label={
                                                `${item}`
                                            }/></div>
                                ))
                            }</ListItemText>

                        </ListItem>
                       

                       </div>
                       <Countdown
    date={Date.now() + 100000}
    intervalDelay={0}
    precision={3}
    renderer={props => <div>{props.total}</div>}
  />
                       




                    </div>
                   
                    <div className="bus_c">
                        <div className="bus_mode">
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
export default Driverbus
