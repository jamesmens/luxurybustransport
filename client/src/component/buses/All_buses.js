import React, {useState, useEffect, useReducer} from "react";
import {Navigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {Get_driver, Alldriver} from "../../store/actions/drivers_action"
import {Get_user} from "../../store/actions/users_action"
import {
    Activebus,
    Delete_bus,
    Get_bus,
    Get_Seats,
    Unactivebus,all_buses,
    bus_trigger
} from "../../store/actions/buses_action";

import BusAlertIcon from '@mui/icons-material/BusAlert';
import {Get_bus_details} from "../../store/actions/buses_action"
import {Get_booking} from "../../store/actions/bookings"
import Popup from 'reactjs-popup';
import moment from "moment"
import 'reactjs-popup/dist/index.css';

import {Loading} from "../ultils/Loading"
import {
    Modal,
    ButtonGroup,
    ButtonToolbar,
    InputGroup,
    FormControl,
    Button

} from "react-bootstrap"

/**    mui imports */
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MessageIcon from '@mui/icons-material/Message';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
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

import {MenuItem, Select} from "@mui/material";
import {Table, Pagination} from "react-bootstrap"
import Moment from "react-moment"
import {LinkContainer} from "react-router-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import EditIcon from '@mui/icons-material/Edit';
import { ShowToast } from "../ultils/tools";
import { notify_remove } from "../../store/actions";

const All_bus = (props) => {

    const user=useSelector((state)=>state.User)
    useEffect(()=>{
        if(user.auth && user.data.role==="user"){
            history("/")
        }
        if(user.auth && user.data.role==="driver"){
            history("/")
        }
    })
    const init_sort = {
        sortBy: "_id",
        order: "asc",
        limit: 15,
        skip: 0
    }
   

    const [sort, Setsort] = useReducer((state, new_sort) => ({
        ...state,
        new_sort
    }), init_sort)
    
    const user_date = (d) => {
        return moment(d).format("DD" - "MM" - "YY")
    }
    const [data_s, setdata] = useState("all")
    const [getvalue, setvalue] = useState();
    const [startpoint, setstart] = useState("G")
    const [endpoint, setend] = useState("G")
const notification=useSelector((state)=>state.Notification)

    if (endpoint != "") {}

    const Filterdate = (data) => {
        if (data_s === "search") {
            return data.filter((item) => {
                if (item && item.busNumber) {
                    return item.busNumber.indexOf(getvalue) > -1
                }
            })


        }


        if (data_s === "find") {
            return data.filter((item) => item.startpoint.toLowerCase() === startpoint.toLowerCase() && item.destination.toLowerCase() === endpoint.toLowerCase())


        }
        if (data_s === "all") {
            return data
        }


    }
    // //// selectors

    let history = useNavigate()
    const dispatch = useDispatch()
    const bus = useSelector((state) => state.Bus_collection)
    const bus_state = useSelector((state) => state.Bus_collection.Buses)
    const new_users = useSelector((state) => state.Get_users)
    const mainbuses = useSelector((state) => state.B)
    const new_ap = useSelector((state) => state.ALLDrivers)
    const Drivers = useSelector((state) => state.Drivers)
    const all_bookings = useSelector((state) => state.Get_tic)
   
    useEffect(() => {
        if (bus && !bus.Buses) {
           
                dispatch(Get_bus(sort))
           
            
        }


    }, [dispatch])
    useEffect(() => {
       
            dispatch(all_buses())
        


    }, [dispatch])
    useEffect(() => {
        if (notification && notification.success) {
       
           ShowToast("SUCCESS",notification.msg)
           dispatch(notify_remove())
          
        }
           
           


    })
 
    const Loadmore = () => {
        const Skip = sort.skip + sort.limit
        Setsort({skip: Skip})
        dispatch(Get_bus({sort, skip: Skip}))
    }


    // //////////////////////date////////////////

    // / dispatch actions  ********************************************************


    useEffect(() => {

        dispatch(Get_Seats())
    })
    useEffect(() => {

    dispatch(Alldriver())

        
    })


    // ///////////////////////
    const ArrayStart = () => {
        let array = []
        if (bus && bus.Buses) {
            bus.Buses.map((i) => array.push(i.startpoint.toLowerCase()))


        }
        let newArray = [...new Set(array)]
        let FilterData = [...new Set(newArray)]

        return FilterData
    }
    const Arrayd = () => {
        let array = []
        if (bus && bus.Buses) {
            bus.Buses.map((i) => array.push(i.destination.toLowerCase()))


        }
        let newArray = [...new Set(array)]
        let FilterData = [...new Set(newArray)]

        return FilterData
    }


    // //////////////////////date////////////////
    const Current_d = new Date()


    return (

        <div className="Load_buss">

            {
            bus && bus.Buses ? <div className="PANEL">
                <div className="ADD_BUS_BTN" style={{marginTop:"40px"}}>

                    <ButtonGroup>
                        <LinkContainer to="/operator/addnew_bus">
                            <Button style={
                                {width: "200px"}
                            }>Add New Bus</Button>
                        </LinkContainer>
                    </ButtonGroup>

                    <ListItemIcon><FilterListIcon fontSize="large"/></ListItemIcon>
                    <div>Filter by</div>

                    <Select onChange={(e)=>setstart(e.target.value) }
                    defaultValue="kumasi"
                        className="bus_a"
                        style={
                            {
                                width: "10%",
                                margin: "10px"
                            }
                    }>{
                       bus && bus.Buses ? 
                        ArrayStart().map((i,e)=><MenuItem key={e} value={i}>
                            {i}</MenuItem>) : null}</Select>
                            <Select onChange={(e)=>setend(e.target.value) }
                    defaultValue="accra"
                        className="bus_a"
                        style={
                            {
                                width: "10%",
                                margin: "10px"
                            }
                    }>{
                       bus && bus.Buses ? 
                        Arrayd().map((i,e)=><MenuItem key={e} value={i}>
                            {i}</MenuItem>) : null}</Select>

                   
                    <Button onClick={
                        () => setdata("find")
                    }>Find</Button>
                    <Button onClick={
                            () => setdata("all")
                        }
                        style={
                            {margin: "10px"}
                    }>Default</Button>
                    <InputGroup style={
                        {
                            width: "20%",
                            margin: "20px"
                        }
                    }>

                        <FormControl onChange={
                                (e) => setvalue(e.target.value)
                            }
                            style={
                                {
                                    width: "500px",
                                    padding: "10px"
                                }
                            }
                            type="text"
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-lg"
                            placeholder="Search buses by Number plate"></FormControl>
                    </InputGroup>
                    <Button onClick={
                        () => setdata("search")
                    }>Search</Button>
                </div>
                <div className="ADD_BUS_BTN">
                    <Button style={{margin:"10px"}}>
                        Active Bus

                    </Button>
                    <Button style={{margin:"10px"}}>
                        Unactive Bus

                    </Button>
                </div>


                <div className="table_description">
                    <h1 className="t_descrip">All active buses
                        <DepartureBoardIcon fontSize="large"/>
                    </h1>


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
                                <th>Travel date</th>
                                <th>departure</th>
                                <th>Driver name</th>
                                <th>Options</th>

                            </tr>

                        </thead>
                        <tbody className="table_body">
                            {

                            bus && bus.Buses ? Filterdate(bus.Buses).filter((i)=>i.ava).map((state) => {

                                return (
                                    <tr key={
                                        state._id
                                    }>


                                        <td><img src={
                                                    state.image
                                                }
                                                style={
                                                    {
                                                        width: "60px",
                                                        height: "50px"
                                                    }
                                                }/></td>

                                        <td>{
                                            state.name
                                        } </td>

                                        <td>{
                                            state.busNumber
                                        }</td>
                                        <td> {
                                            state.fare
                                        } </td>
                                        <td>{
                                            state.startpoint
                                        }</td>

                                        <td>{
                                            state.destination
                                        }</td>
                                        <td>{
                                            moment(state.work_days[0]).format("LL")
                                        }</td>
                                        <td>{
                                            moment(state.work_days[0]).format("HH:mm:ss")
                                        }</td>
                                        <td>{
                                            state && state.driver[0] ? <>{
                                                state.driver[0].username
                                            }</> : null
                                        }</td>


                                        <td className="table_options">
                                            {
                                                state.ava==="true" ?
                                                <Popup trigger={
                                                    <BusAlertIcon
                                                className="t_option_d"/>
                                                }
                                                position="left center">
                                                <div>
                                                    <Button onClick={
                                                        () => {
                                                            dispatch(Unactivebus(state._id))
                                                            setTimeout(()=>{
                                                                dispatch(bus_trigger(sort))
                                                            },1000)
                                                        }
                                                    }>Unactivate bus</Button>
                                                </div>
                                            </Popup>:
                                            
                                             <Popup trigger={
                                                 <BusAlertIcon
                                             style={{color:"green"}}/>
                                             }
                                             position="left center">
                                             <div>
                                                 <Button onClick={
                                                     () => {
                                                      
                                                        dispatch(Activebus(state._id))
                                                        setTimeout(()=>{
                                                            dispatch(bus_trigger(sort))
                                                        },1000)}
                                                 
                                                 }>activate bus</Button>
                                             </div>
                                         </Popup>


                                            }
                                      
                                       
                                            <Popup trigger={
                                                    <DeleteOutlineIcon
                                                className="t_option_d"/>
                                                }
                                                position="left center">
                                                <div>
                                                    <Button onClick={
                                                        () => {
                                                            dispatch(Delete_bus(state._id))
                                                        setTimeout(()=>{
                                                            dispatch(bus_trigger(sort))
                                                        },1000)}
                                                    }>Click to remove bus</Button>
                                                </div>
                                            </Popup>


                                            <EditIcon className="t_option_e"
                                                onClick={
                                                    () => history(`/operator/Bus/${
                                                        state._id
                                                    }`)
                                                }/></td>
                                    </tr>

                                )


                            }) : null
                        } </tbody>


                    </Table>
                    {
                        mainbuses && mainbuses.bus ?
                        <>{  bus && bus.Buses ?
                            <>
                            {bus.Buses.length===mainbuses.bus.length ?
                            null: <Button style={
                                {width: "90%"}
                            }
                            onClick={
                                () => Loadmore()
                        }>view all buses</Button> }
                            </>

                            :null

                        }
                        </>
                        :null
                    }
                   


                </div>


            </div> : <div style={
                {
                    width: "100%",
                    height: "100%"
                }
            }>
                {
                Loading()
            }</div>
        } </div>


    )
}

export default All_bus
