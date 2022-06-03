import React,{useEffect,useState,useReducer} from "react";
import {Get_bus, Get_Seats} from "../../store/actions/buses_action";
import PromiseCon from "../ultils/promise"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Load_bus from "../buses/loadbus";
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {Loading} from "../ultils/Loading"
import {useFormik} from "formik"
import moment from "moment"
import { LinkContainer} from "react-router-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


import {
    Modal,ButtonGroup,ButtonToolbar,InputGroup,FormControl,Button

} from  "react-bootstrap"
import Security from "../ultils/security"

/**    mui imports */
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageIcon from '@mui/icons-material/Message';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FilterListIcon from '@mui/icons-material/FilterList';
import AOS from "aos";
import "aos/dist/aos.css";
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
import {
   
   
    MenuItem,
   
    Select,
  } from "@mui/material";
import Sponsors from "../ultils/Sponsors";
//////////////////


const Home=()=>{
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    /////////////////
const history=useNavigate()
const Component=useSelector((state)=>state.Component)

    const init_sort={sortBy:"_id",order:"asc",limit:2000,skip:0}
    const bus = useSelector((state) => state.Bus_collection)
    const dispatch = useDispatch()
     

  
    useEffect(()=>{
        if(bus && !bus.Buses){
            dispatch(Get_bus(init_sort))   
        }
        

    },[dispatch])

const user_date=(d)=>{
  return  moment(d).format("DD"-"MM"-"YY")
}
const  [data_s,setdata]=useState("all")
const [getvalue,setvalue]=useState();
const [startpoint,setstart]=useState("G")
const [endpoint,setend]=useState("G")
const [Time,onChangeT]=useState(new Date())
const [Switch,setswitch]=useState(false)

const Filterdate=(data)=>{
    if(data_s==="search"){
        return data.filter((item)=>{
            if(item && item.busNumber) {
                return  item.busNumber.indexOf(getvalue) >-1
                }
        })
  
     
    } 

    if(data_s ==="all" ){
        return data
    }
    if(data_s==="find"){
        return data.filter((item)=>item.startpoint.toLowerCase()===startpoint.toLowerCase() && item.destination.toLowerCase()===endpoint.toLowerCase() && moment(item.work_days[0]).format("MMMM d, YYYY")===moment(Time).format("MMMM d, YYYY"))
    
    }
    if(data_s==="pending"){
        return data.filter((item)=>item.status==="pending")
    }
    
       
    }
  
    const Final_data=(data)=>{
        if(bus && bus.Buses){
           return Filterdate(data).filter((item)=>item.startpoint=="bogoso")
        }
    }
  
      const ArrayStart=()=>{ 
          let array=[]
          if( bus && bus.Buses){
              bus.Buses.map((i)=>array.push(i.startpoint.toLowerCase()))
           

          }  
          let newArray=[...new Set(array)]
          let FilterData=[...new Set(newArray)]
          
  return FilterData
      }
      const Arrayd=()=>{ 
        let array=[] 
        if( bus && bus.Buses){
            bus.Buses.map((i)=>array.push(i.destination.toLowerCase()))
         

        }  
        let newArray=[...new Set(array)]
        let FilterData=[...new Set(newArray)]
        
return FilterData
    }
   const Background=()=>{
       let pic="FGF"
       if(Component && Component.main){
           pic=Component.main.filter((i)=>i.type==="Searchbar")
       }
       return pic[0].photo;
   }
const backgroundImage=Component.main;



    return(<div data-aos="zoom-out-right" className="loaders">
    { bus && bus.Buses ?
      <div className="homePage">    
      { Switch ? null :
        <div data-aos="fade-up"
        data-aos-anchor-placement="top-bottom" className="homesearch" style={{
        backgroundColor:"#E3E2DF",
        
    
        backgroundRepeat:"no-repeat",
        backgroundImage:`url(${Background()})`}} >
                          <div className="searchbars">
        <p style={{fontFamily:"frekoda",fontWeight:"bolder",color:"white", fontSize:"20px",marginTop:"20px"}}>From</p>
            <Select defaultValue="axim" onChange={(e)=>setstart(e.target.value)} placeholder="start point" className="bus_a" style={{width:"100%", margin:"10px",height:"40px"}}>
            { bus && bus.Buses ?
                 ArrayStart().map((i)=>
       <MenuItem key={i} value={i}>{i}</MenuItem>
       ) 
                 :null
                
             }  
            </Select>
         
            <p style={{fontFamily:"frekoda",fontWeight:"bolder",color:"white", fontSize:"20px",marginTop:"20px"}}>TO</p>
        <Select defaultValue="accra" style={{width:"100%",margin:"10px",height:"40px"}} 
        onChange={(e)=>setend(e.target.value)} 
            className="bus_a"
            placeholder="destination"
             >{ bus && bus.Buses ?
                 Arrayd().map((i)=>
       <MenuItem key={1} value={i}>{i}</MenuItem>
       ) 
                 :null
                
             }
                 
      
               
      </Select>
      </div>
   
      <div className="searchbarspicker"><DatePicker className="datepicker" selected={Time} onChange={(date) => onChangeT(date)} />

           
           
            <Button style={{marginLeft:"20px"}} onClick={()=>{
                setTimeout(()=>{
                  setswitch(true)

                },1000)
                setdata("find")}} >Search</Button></div></div> }
    
   
     
      
  
      <div>
  { Switch ? 

  <>
  <div onClick={()=>setswitch(false)}  className="page_h"><TurnLeftIcon/> Home</div>
 {
     bus && bus.Buses ? 
     <>
     {
          Filterdate(bus.Buses).length===0 ?
          <div className="spaces_bus">
               <div className="space_bus"><p style={{fontFamily:"frekoda"}}>oops, no bus found</p></div> </div>
         
          :
          <div style={{backgroundColor:"#c1e1ee"}}>
              <div style={{backgroundColor:"#c1e1ee",display:"flex",flexDirection:"column",alignItems:"center"}}>
              <p>Buses available from your search</p>
              </div>
         
          {
     bus && bus.Buses ? 
     Filterdate(bus.Buses).map((item,index)=>{
         return(<div className="user_s">
             
             <div className="bus_container">
             <div className="user_box">
                 {  
                 item.image==="string" ? <ListItemIcon>
                 <DirectionsBusFilledIcon  fontSize="large" className="bus_icon"/>
                 </ListItemIcon>:
                <img style={{width:"70px",height:"60px"}} src={item.image} />
                 
                 }
    
     
   
      <p style={{marginTop:"15px" ,fontFamily:"frekoda",fontWeight:"bolder"}}
     
      
     >{"GH₵" + " " + item.fare}</p>
      <p
      
      style={{marginTop:"15px" ,fontFamily:"frekoda",fontWeight:"bolder"}}
     >{moment(item.work_days[0]).format("hh:mm A")}</p>
     
     
  
       <Button onClick={()=>history(`/upage/ticket/${item._id}`)}>Buy Now</Button>
     </div>
             </div>
             </div>
         )
     }):null}

          </div>

     }
     </>
     :null
    
 }
 

    
  
  
  </> : <>
  <Security/>
  <PromiseCon/>
<Sponsors/>
  
  
  
  
</>
   }
      </div>
   
                         

     
    
     







  </div>


:<div>{Loading()}</div>}
  


    </div>)
}


export default Home;