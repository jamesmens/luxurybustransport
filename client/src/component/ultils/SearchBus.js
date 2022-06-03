
import React,{useEffect,useState,useReducer} from "react";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageIcon from '@mui/icons-material/Message';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import {Get_bus} from "../../store/actions/buses_action";
import FilterListIcon from '@mui/icons-material/FilterList';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import { LinkContainer} from "react-router-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal,ButtonGroup,ButtonToolbar,InputGroup,FormControl,Button

} from  "react-bootstrap"
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
import Load_bus from "../buses/loadbus";
import moment from "moment"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {Loading} from "../ultils/Loading"
const SearchBus=({FilterData})=>{

    const history=useNavigate()

    const init_sort={sortBy:"_id",order:"asc",limit:2000,skip:0}
    const bus = useSelector((state) => state.Bus_collection)

    const dispatch = useDispatch()
    useEffect(()=>{
        if(bus && !bus.Buses){
            dispatch(Get_bus(init_sort))   
        }
    })

    return(<div className='searchbus'>
          { bus && bus.Buses ? 
           FilterData(bus.Buses).map((item,index)=>{
               return(
                <ListItem style={{paddingTop:"20px",margin:"10px"}} alignItems="flex-start" className="user_box">
                {  
                item.image==="string" ? <ListItemIcon>
                <DirectionsBusFilledIcon  fontSize="large" className="bus_icon"/>
                </ListItemIcon>:
               <img style={{width:"70px",height:"60px"}} src={item.image} />
                
                }
   
    
  
     <ListItemText style={{marginLeft:"20px"}}
      primary={"fare" + " " + item.fare}
     
    />
     <ListItemText
      primary={"time "+ " "+ moment(item.work_days[0]).format("HH:mm:ss")}
     
    />
    
    
     <ListItemText
      primary={"slots left"+ ": " + item.seatsAvailable}
     
    />
      <Button onClick={()=>history(`/upage/ticket/${item._id}`)}>Buy ticket</Button>
    </ListItem>


               )} ):null 
               
               
               
            }
        


    </div>

    )
}

export default SearchBus