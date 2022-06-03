import React, { useEffect, useReducer, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Create_seats, New_bus,Get_Seats,Remove_seat } from "../../store/actions/buses_action";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import { useFormik, FormikProvider, FieldArray } from "formik";
import AOS from "aos";
import "aos/dist/aos.css";
import * as Yup from "yup";
import  {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import BusinessIcon from '@mui/icons-material/Business';
import DeleteIcon from '@mui/icons-material/Delete';

import 'reactjs-popup/dist/index.css';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import GppGoodIcon from '@mui/icons-material/GppGood';
import {
  Divider,
  InputAdornment,
  TextField,
  Button,
  ListItem,
  MenuItem,
  Chip,
  IconButton,
  FormHelperText,
  Paper,
  InputBase,
  Select,
} from "@mui/material";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Filter1Icon from "@mui/icons-material/Filter1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import MoneyIcon from "@mui/icons-material/Money";
import AddIcon from "@mui/icons-material/Add";
import {Get_driver,Alldriver} from "../../store/actions/drivers_action"



const Add_bus = () => {
  useEffect(()=>{
    dispatch(Alldriver())
    
})

  const Drivers=useSelector((state)=>state.D)
  const [seat_action,seat_r]=useState(false)
  const init_sort={page:1,limit:100, skip:0}
  const history=useNavigate();
  const dispatch = useDispatch();
  const Allseats=useSelector((state)=>state.All_seats)
 
  const New_b=useSelector((state)=>state.NewBus)
 
  const user=useSelector((state)=>state.User)
  useEffect(()=>{
      if(user.auth && user.data.role==="user"){
          history("/")
      }
      if(user.auth && user.data.role==="driver"){
          history("/")
      }
  })
  ///// seats ***************************************************************/
const Remove_seats=(seats)=>{
  if(seat_action){
    dispatch(Remove_seat(seats._id))
    dispatch(Get_Seats())
   
  }
  if(!seat_action){
    dispatch(Get_Seats())
    dispatch(Get_driver(init_sort))

   alert(seats.no)
  }
}
useEffect(() => {
  AOS.init();
  AOS.refresh();
}, []);

  const seat_th=()=>{
    return(<>
    {
    Allseats &&Allseats.SEATS ?
    
    Allseats.SEATS.slice(0,((Allseats.SEATS.length)/4)+1 ).map((seats,i)=>{
      return(
    
           <div key={i} className="seat_th">
      <div onClick={()=>{
        Remove_seats(seats)
       
      }}><EventSeatIcon fontSize="large" style={{height:"35px",width:"35px"}}/></div>
   
      </div>
  
     
      )
    })
    
   :null}
   
   </>)
  }
  const seat_2th=()=>{
    return(<>
      {
     Allseats &&Allseats.SEATS ?
     Allseats.SEATS.slice(((Allseats.SEATS.length)/4)+1,(2*((Allseats.SEATS.length)/4))).map((seats,i)=>{
        return(
       
             <div key={i} className="seat_2th">
        <div onClick={()=>{
         Remove_seats(seats)
       
      }}>  <EventSeatIcon fontSize="large" style={{height:"35px",width:"35px"}}/></div>
        </div>
       
       
        )
      })
      
     :null}
     
     </>)
  
  }
  const midseat=()=>{
    return(
      <>
      {
        Allseats && Allseats.SEATS ?
        Allseats.SEATS.slice((Allseats.SEATS.length)/2,(Allseats.SEATS.length)/2 +1 ).map((seats,i)=>{
          return(<>
          
          <div key={i} className="seat_3th">
        <div onClick={()=>{
        Remove_seats(seats)
       
      }}>  <EventSeatIcon fontSize="large" style={{height:"35px",width:"35px"}}/></div>
        </div>

          </>)
        }):null
      }
      </>
    )
  }
  const seat_3th=()=>{
    return(<>
      {
     Allseats &&Allseats.SEATS ?
     Allseats.SEATS.slice(2*((Allseats.SEATS.length)/4)+1,(3*((Allseats.SEATS.length)/4)+1)).map((seats,i)=>{
        return(
       
             <div key={i} className="seat_3th">
        <div onClick={()=>{
        Remove_seats(seats)
       
      }}>  <EventSeatIcon fontSize="large" style={{height:"35px",width:"35px"}}/></div>
        </div>
       
       
        )
      })
      
     :null}
     
     </>)
  
  }
  const seat_4th=()=>{
    return(<>
      {
     Allseats &&Allseats.SEATS ?
     Allseats.SEATS.slice(3*((Allseats.SEATS.length)/4)+1,(4*((Allseats.SEATS.length)/4)+1)).map((seats,i)=>{
        return(
       
             <div key={i} className="seat_4th">
        <div onClick={()=>{
       Remove_seats(seats)
       
      }}>  <EventSeatIcon fontSize="large" style={{height:"35px",width:"35px"}}/></div>
        </div>
       
       
        )
      })
      
     :null}
     
     </>)
  
  }

   //******************************above********************************************* */

  const [value, onChange] = useState(new Date());

  //////////////////Pop up message
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }


///////////////// v/////////////////////////
  const Formik = useFormik({
    initialValues: {
     company:"",
      name: "",
      busNumber: "",

      fare: "",
      boardingPoints: [],
      droppingPoints: [],
      driver:"",
      work_days: [],
      startpoint:"",
      destination:"",
      seatsAvailable:`${Allseats.SEATS.length}`,
      file:"",
    },
    validationSchema: Yup.object({
      company: Yup.string().required("company name required"),
      name: Yup.string().required("bus name required"),
      busNumber: Yup.string().required("bus number required"),
      fare: Yup.number().required("fare required !!"),
      file: Yup.mixed()
    .required("file required"),
      driver: Yup.string().required("please select a driver"),
      boardingPoints: Yup.array().required("please add atleat one board point"),
     startpoint:Yup.string().required("field required"),
     destination:Yup.string().required("field required"),
      droppingPoints: Yup.array().required("please add atleat one stop point"),
    }),
    onSubmit: (values) => {
    

      // dispatch(New_bus(values))
 
     
    },
  });
 
 

  const board = useReducer();
  const stops=useReducer()

  const ErrorHandler=(formik,values)=>({
    error:formik.errors[values] &&formik.touched[values] ? true:false,
    helperText:formik.errord[values] && formik.touched[values] ? formik.errors[values] :null 
})

   ///// seats ***************************************************************/


   //*********************** *******above********************************************* */

   const popup=()=>{
    return(<div  className="register_option">
        <div className="regbox"> 
       
   <div className="register_box">
       <p> Click continue to complete process</p>
       <ListItem
          
            button
            onClick={()=>
            history(`operator/Bus/${New_b.new_b._id}`)}
          
          >
            <Button style={{margin:"0 0px 0px 200px",color:"white" ,fontFamily:"Reboto" ,fontSize:"30px",fontWeight:"bolder",backgroundColor:"#ef9273", width:"50%"}}> Continue </Button>
          </ListItem>
  
   
    
   </div>
   </div>
    </div>)
}
  return (
    <div data-aos="fade-up"
    data-aos-duration="3000" >
    <div className="add_screen">
    <div className="Update_case"> 

     <div className="Update_panel">
     <form onSubmit={Formik.handleSubmit} >

     <div className="bus_box"><TextField
     className="bus_a"

InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <BusinessIcon/>
    </InputAdornment>
  ),
}}
varients="outlined"
name="company"
label="company"
error={Formik.errors.company && Formik.touched ? true : null}
{...Formik.getFieldProps("company")}

></TextField></div>
<div>{Formik.errors.company}</div>
      

   

      
     <div className="bus_box"><TextField
     className="bus_a"

InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <AirportShuttleIcon />
    </InputAdornment>
  ),
}}
varients="outlined"
name="name"
label="name"
error={Formik.errors.name && Formik.touched ? true : null}
{...Formik.getFieldProps("name")}

></TextField></div>
<div>{Formik.errors.name}</div>
      
  <div className="bus_box">
<TextField
className="bus_a"
        name="busNumber"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Filter1Icon className="bus_icon"/>
            </InputAdornment>
          ),
        }}
        label="Bus number"
        error={Formik.errors.busNumber && Formik.touched ? true : null}
       
        {...Formik.getFieldProps("busNumber")}
      ></TextField>
</div>
<div className="input_error">{Formik.errors.busNumber}</div>
<div className="bus_box">
<TextField
className="bus_a"
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
        error={Formik.errors.startpoint && Formik.touched ? true : null}
       
        {...Formik.getFieldProps("startpoint")}
      ></TextField>
</div>
      <div className="input_error">{Formik.errors.startpoint}</div>
   
<div className="bus_box">
<TextField
className="bus_a"
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
        error={Formik.errors.destination && Formik.touched ? true : null}
       
        {...Formik.getFieldProps("destination")}
      ></TextField>
</div>
<div className="input_error">{Formik.errors.destination}</div>
  
      <div className="bus_box">
      <TextField
      className="bus_a"
        name="fare"
        label="Fare"
        {...Formik.getFieldProps("fare")}
        error={Formik.errors.fare && Formik.touched ? true : null}
    
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MoneyIcon className="bus_icon" />
            </InputAdornment>
          ),
        }}
      ></TextField>

      </div>
      <div className="input_error">  {Formik.errors.fare}</div>
      
     
      <div className="bus_box">
      <FormikProvider value={Formik}>
        <FieldArray
          name="boardingPoints"
          render={(arrayHelpers) => (
            <>
              <Paper className="bus_a">
                <InputBase 
                
                  color="secondary"
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
                  <AddIcon className="bus_icon" />
                </IconButton>
              </Paper>
              {Formik.errors.boardingPoints && Formik.touched.boardingPoints ? (
                <FormHelperText error={true}>
                 
                </FormHelperText>
              ) : null}

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
      <div className="input_error">
      {Formik.errors.boardingPoints}
      </div>
      
      
      <div className="bus_box">
        
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
                  <AddIcon className="bus_icon"/>
                </IconButton>
              </Paper>
              {Formik.errors.droppingPoints && Formik.touched.droppingPoints ? (
                <FormHelperText error={true}>
                  {Formik.errors.droppingPoints}
                </FormHelperText>
              ) : null}
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

     
      <div className="bus_box">
      <Select
       value={Formik.values.driver ?? ""}
      className="bus_a"
        name="driver"
        label="driver"
        {...Formik.getFieldProps("driver")}
        error={Formik.errors.driver && Formik.touched ? true : null}
      >
        {
          Drivers && Drivers.AllD?
          Drivers.AllD.map((driver,index)=>
            
              <MenuItem value={driver.username} key={index}>{driver.username}</MenuItem>
          
          )
          :null
        }
       
       
      </Select>
      </div>
      
      {Formik.errors.driver && Formik.touched ? (
        <FormHelperText error={true} className="input_error">{Formik.errors.driver}</FormHelperText>
      ) : null}
    
      <div className="bus_box">
      <FormikProvider value={Formik}>
        <FieldArray
          name="work_days"
          render={(arrayHelpers) => (
            <>
              <LocalizationProvider  dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker className="bus_a"
                  value={value}
                  onChange={(newvalue) => {
                    onChange(newvalue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <IconButton
                onClick={() => {
                  arrayHelpers.push(moment(value).format("YYYY-MM-DD h:mm:ss"));
                }}
              >
                <Button variant="contained" disableElevation >ADD
                      </Button>
              </IconButton>
              {Formik.values.work_days.map((item,index) => {
                return (
                  <div className="bus_chip" >
                    <Chip onDelete={() => arrayHelpers.remove(index)}
                          color="secondary"
                    label={`${item}`} className="bus_chip" key={index} />
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
           
            variant="outlined"
            color="secondary"
           onClick={()=>dispatch(New_bus(Formik.values))}
          >
            Add bus
          </Button>
          </div>
          
    </form>
    <div>
      {New_b && New_b.new_b ?
      <>{popup()}</>
      
     : null}
    </div>
   
     
  

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
     
      <div className="create_seat Grid_seat" style={{height:"600px",width:"250px"}}>
      <div>{seat_th()}</div>
         
         <div>{seat_2th()}</div>
         <div>{midseat()}</div>
         <div>{seat_3th()}</div>
         <div>{seat_4th()}</div>

        
      </div>
     
      
     </div>
    
 
        
   
      </div>
      
  
    </div>
    </div>
   
    
  );
};
export default Add_bus;
