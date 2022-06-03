import React, { useEffect, useReducer, useState } from "react";
import {useParams} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import {Update_bus,Create_seats,Get_Seats,Remove_seat,Upload_img} from "../../store/actions/buses_action"

import BusAlertIcon from '@mui/icons-material/BusAlert';
import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import { Form , Button as btn} from "react-bootstrap";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import BusinessIcon from '@mui/icons-material/Business';
import { notify_remove } from "../../store/actions"

import {
  Divider,
  InputAdornment,
  TextField,
  Button,
  MenuItem,
  Chip,
  IconButton,
  FormHelperText,
  Paper,
  InputBase,
  Select,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Filter1Icon from "@mui/icons-material/Filter1";
import ChairIcon from '@mui/icons-material/Chair';
import PanoramaPhotosphereSelectIcon from '@mui/icons-material/PanoramaPhotosphereSelect'
import MoneyIcon from "@mui/icons-material/Money";
import AddIcon from "@mui/icons-material/Add";

import VisibilityIcon from '@mui/icons-material/Visibility';
import { ShowToast } from "../ultils/tools";
const Update_Bus = ({ bus }) => {
  const params=useParams()
  const Drivers=useSelector((state)=>state.Drivers)
  const [value, onChange] = useState(new Date());
  
  const dispatch=useDispatch()
  const Notify=useSelector((state)=>state.Notification)
  const [seat_action,seat_r]=useState(false)
  const Remove_seats=(seats)=>{
    if(seat_action){
      dispatch(Remove_seat(seats._id))
      dispatch(Get_Seats())
      
    }
    if(!seat_action){
  
     alert(seats.no)
    }
  }
  useEffect(()=>{
    if(Notify && Notify.success){
      ShowToast("SUCCESS",Notify.msg)
      dispatch(notify_remove())
    }
  })
  ///////////////////////////
  const Formik_img = useFormik({
    initialValues: {
     
  
      file:""
    },
    validationSchema: Yup.object({
     
      file: Yup.mixed()
    .required("file required"),
    
    }),
    onSubmit: (value) => {
     
      let formData=new FormData() ;  
      formData.append("file",value.file)
      
     

      dispatch(Upload_img(params.id,formData))
    
      
 
     
    },
  });
  const ErrorHandler=(formik,values)=>({
    error:formik.errors[values] &&formik.touched[values] ? true:false,
    helperText:formik.errord[values] && formik.touched[values] ? formik.errors[values] :null 
})
const init_sort={page:1,limit:1000, skip:0}


  ////////////////////////
  const Formik = useFormik({
    initialValues: {
      name: `${bus.bus_d.name}`,
      busNumber: `${bus.bus_d.busNumber}`,
      fare: `${bus.bus_d.fare}`,
      startpoint:`${bus.bus_d.startpoint}`,
      destination:`${bus.bus_d.destination}`,
      boardingPoints: [
     
      ],
    company:`${bus.bus_d.company}`,
      droppingPoints: [],
      driver: `${bus.bus_d.driver[0].username}`,
      work_days:[],
    },
   
    onSubmit: (values) => {
      dispatch(Update_bus(params.id,values))
    
     
    },
  });
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const board = useReducer();
  const stops = useReducer();
/***           seats  */


const seat_th = () => {
  return (
      <> {
          bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice(0, (bus.bus_d.seats_no.length) / 4).map((seats) => {
              return (

                  <div className="seat_th">
                      <div onClick={()=>{
        Remove_seats(seats)
       
      }}
                      ><ChairIcon fontSize="medium"
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
          bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice(((bus.bus_d.seats_no.length) / 4) + 1, (2 * ((bus.bus_d.seats_no.length) / 4) + 1)).map((seats) => {
              return (

                  <div className="seat_2th">
                      <div onClick={()=>{
        Remove_seats(seats)
       
      }}>
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
      <div data-aos="fade-up"
      data-aos-duration="3000" > {
          bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice((bus.bus_d.seats_no.length) / 2, (bus.bus_d.seats_no.length) / 2 + 1).map((seats) => {
              return (
                  <>

                      <div className="seat_3th">
                          <div onClick={()=>{
        Remove_seats(seats)
       
      }}>
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
      } </div>
  )
}
const seat_3th = () => {
  return (
      <> {
          bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice(2 * ((bus.bus_d.seats_no.length) / 4) + 1, (3 * ((bus.bus_d.seats_no.length) / 4) + 1)).map((seats) => {
              return (

                  <div className="seat_3th">
                      <div onClick={()=>{
        Remove_seats(seats)
       
      }}>
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
          bus.bus_d && bus.bus_d.seats_no ? bus.bus_d.seats_no.slice(3 * ((bus.bus_d.seats_no.length) / 4) + 1, (4 * ((bus.bus_d.seats_no.length) / 4) + 1)).map((seats) => {
              return (

                  <div className="seat_4th">
                      <div onClick={()=>{
        Remove_seats(seats)
       
      }}>
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
/********************************************************** */
const Updateworkday=(field)=>{
  bus.bus_d.work_days.map((item)=>
field.push(item)
  )
}
const Updateboardpoint=(field)=>{
  bus.bus_d.boardingPoints.map((item)=>
field.push(item)
  )
}
const Updatedroppoint=(field)=>{
  bus.bus_d.droppingPoints.map((item)=>
field.push(item)
  )
}




const useStyles = makeStyles((theme) => ({
  Icon_IMG: {
    '& svg': {
      fontSize: 250,
    
    }
  },

}));
const classes=useStyles()

  return (<div className="Update_layout">
    <div className="Update_image">
     
      <div className="updateimg" > { bus.bus_d.image==="string" ? <IconButton className={classes.Icon_IMG}>< BusAlertIcon /></IconButton>: <img src={bus.bus_d.image} style={{width:"50%",height:"30%" }}/>
      }</div> 
    <div className="bus_description">
   <div className="Containupdate">
   <div className="ITEM" >name : </div> <p className="ITEM">{bus.bus_d.name}</p></div>  
   <div className="Containupdate">
   <div className="ITEM" >Date created :</div> <p className="ITEM">{moment(bus.bus_d.createdAt).format("LL")}</p></div>  
   <div className="Containupdate">
   <div className="ITEM" >Status  :</div> <p className="ITEM">{bus.bus_d.name}</p></div>  
   <div className="Containupdate">
   <div className="ITEM" >Driver :</div> <p className="ITEM">{bus.bus_d.driver[0].firstname}</p> <p className="ITEM">{bus.bus_d.driver[0].lastname}</p></div> 
   
   

  </div>
  </div>
   
    <div className="Update_case">
        
      <div className="Update_panel">
        <Form onSubmit={Formik_img.handleSubmit}>
      <Form.Group>
            <Form.Label>Default file input example</Form.Label>
    <Form.Control type="file"
     label="file"
     id="file"
     name="file"
     onChange={(event)=>{
        Formik_img.setFieldValue("file",event.target.files[0])
    }}/>
                
                   {
                   Formik.errors.file && Formik.touched.file ?
                   <>Error</> :null
                }

                
            </Form.Group>
            <Button type="submit" varient="primary" 
              >Upload</Button>
             
            </Form>
        <form onSubmit={Formik.handleSubmit}>
        <div className="bus_n">
            <TextField
              className="bus_a"
              color="secondary" focused
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon className="bus_icon"/>
                  </InputAdornment>
                ),
              }}
              varients="outlined"
              name="company"
              label="company"
            
              {...Formik.getFieldProps("company")}
             
            ></TextField>
            <div>{bus.bus_d.company}</div>
          </div>
          <div className="bus_n">
            <TextField
              className="bus_a"
              color="secondary" focused
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AirportShuttleIcon className="bus_icon"/>
                  </InputAdornment>
                ),
              }}
              varients="outlined"
              name="name"
              label="name"
            
              {...Formik.getFieldProps("name")}
             
            ></TextField>
            <div>{bus.bus_d.name}</div>
          </div>
          
         
          <div className="bus_np">
            <TextField
              className="bus_a"
              name="busNumber"
              color="secondary" focused
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Filter1Icon  className="bus_icon" />
                  </InputAdornment>
                ),
              }}
              label="Bus number"
             
              {...Formik.getFieldProps("busNumber")}
            ></TextField>
            <div>{bus.bus_d.busNumber}</div>
          </div>

       
          <div className="bus_f">
            <TextField
            size="normal"
            color="secondary" focused
              className="bus_a"
              name="fare"
              label="Fare"
              {...Formik.getFieldProps("fare")}
             
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon className="bus_icon"/>
                  </InputAdornment>
                ),
              }}
            ></TextField>
              <div>GH₵ {bus.bus_d.fare}</div>
          </div>
          <div className="bus_f">
            
<TextField
className="bus_a"
size="normal"
color="secondary" focused
        name="startpoint"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Filter1Icon className="bus_icon"/>
            </InputAdornment>
          ),
        }}
        label="startpoint"
      
       
        {...Formik.getFieldProps("startpoint")}
      ></TextField>
</div>
      
   
<div className="bus_f">
<TextField
className="bus_a"
size="normal"
color="secondary" focused
        name="destination"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Filter1Icon className="bus_icon"/>
            </InputAdornment>
          ),
        }}
        label="destination"
        
       
        {...Formik.getFieldProps("destination")}
      ></TextField>
</div>

         
          <div className="bus_bp">
            <FormikProvider value={Formik}>
              <FieldArray
                name="boardingPoints"
                render={(arrayHelpers) => (
                  <>
                    <Paper className="bus_a">
                      <InputBase
                         color="secondary" focused
                        placeholder="Add boarding Points"
                        className="bus_board_base"
                        inputRef={board}
                      />
                      <IconButton
                        onClick={() => {
                          arrayHelpers.push(board.current.value);
                          board.current.value = "";
                        }}
                      >
                        <AddIcon className="bus_icon"/>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          Updateboardpoint(arrayHelpers) ;
                        
                        }}
                      >
                        <VisibilityIcon className="bus_icon" />
                      
                      </IconButton>
                    </Paper>
                  
                    {Formik.values.boardingPoints.map((item, index) => (
                      <div className="bus_chip" key={index}>
                        <Chip
                         color="secondary"
                          onDelete={() => arrayHelpers.remove(index)}
                          label={`${item}`}
                        />
                      </div>
                    ))}
                  </>
                )}
              />
            </FormikProvider>
          </div>

         

          <div className="bus_stop">
            <FormikProvider value={Formik}>
              <FieldArray
                name="droppingPoints"
                render={(arrayHelpers) => (
                  <>
                    <Paper className="bus_a">
                      <InputBase
                        color="secondary"
                        placeholder="Add stop Points"
                        className="bus_stop_base"
                        inputRef={stops}
                      />
                      <IconButton
                        onClick={() => {
                          arrayHelpers.push(stops.current.value);
                          stops.current.value = "";
                        }}
                      >
                        <AddIcon className="bus_icon" />
                      
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          Updatedroppoint(arrayHelpers) ;
                        
                        }}
                      >
                        <VisibilityIcon className="bus_icon" />
                      
                      </IconButton>
                    </Paper>
                   
                    {Formik.values.droppingPoints.map((item, index) => (
                      <div className="bus_chip" key={index}>
                        <Chip
                         color="secondary"
                          onDelete={() => arrayHelpers.remove(index)}
                          label={`${item}`}
                        />
                      </div>
                    ))}
                  </>
                )}
              />
            </FormikProvider>
          </div>

          
          <div className="bus_d">
            <Select
              className="bus_a"
              name="driver"
           
            >
           {
          Drivers && Drivers.AllDriver?
          Drivers.AllDriver.map((driver,index)=>
            
              <MenuItem value={driver.username} key={driver.index}>{driver.username}</MenuItem>
          
          )
          :null
        }
              
           
            </Select>
          </div>

          
         
          <div className="bus_wd">
            <FormikProvider value={Formik}>
              <FieldArray
                name="work_days"
                
                render={(arrayHelpers) => (
                  <>
                    <LocalizationProvider
                    
                      dateAdapter={AdapterDateFns}
                      className="bus_a"
                    >
                      <MobileDateTimePicker
                      className="bus_a"
                        value={value}
                        onChange={(newvalue) => {
                          onChange(newvalue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                     
                    </LocalizationProvider>
                    <IconButton
                      onClick={() => {
                        arrayHelpers.push(
                          moment(value).format("YYYY-MM-DD h:mm:ss")
                        );
                      }}
                    >
                      <Button variant="contained" disableElevation >ADD
                      </Button>
                    </IconButton>
                    <IconButton
                        onClick={() => {
                          Updateworkday(arrayHelpers) ;
                        
                        }}
                      >
                        <VisibilityIcon className="bus_icon" />
                      
                      </IconButton>

                   
                    {Formik.values.work_days.map((item,index) => {
                      return (
                        <div className="bus_chip" key={index}>
                          <Chip 
                          onDelete={() => arrayHelpers.remove(index)}
                          color="secondary"
                          className="bus_chip" label={`${item}`}
                            />
                        </div>
                      );
                    })}
                  </>
                )}
              />
            </FormikProvider>
          </div>
          <div className="bus_sub">
          <Button className="bus_suba"
            type="submit"
            variant="outlined"
            color="secondary"
            
          >
            Update Bus
          </Button>
          </div>
          
        

        </form>
      </div>
      <div className="seat_section">
     <div className="seat_c">
      <Button style={{display:"block" ,color:"black", fontFamily:"fredoka", fontWeight:"bold",margin:"5px",padding:"5px 14px 5px 20px",width:"140px"}} onClick={
  ()=> {dispatch(Create_seats())
  dispatch(Get_Seats())}

    }
    variant="outlined"
    color="secondary"
    >Create seat</Button>

        <Button
        style={{display:"block" ,color:"black", fontFamily:"fredoka", fontWeight:"bold",margin:"5px",padding:"5px 10px 5px 20px" ,width:"140px"}}
          variant="outlined"
          color="secondary"
           onClick={
          ()=>seat_r(!seat_action)
        }

    >{
      seat_action ? <p>Lock seat</p>: <p>Remove seat</p>
    }</Button>
      </div>
      <div data-aos="fade-up"
        data-aos-duration="3000"  className="bus_cs">
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
    </div>
    </div>
    </div>
    </div>
  );
};

export default Update_Bus;
