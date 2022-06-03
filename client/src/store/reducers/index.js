import {combineReducers} from "redux"


import Bus_collection from "./buses"
import Users from "./AccountD";
import Orders from "./orders";
import Comments from "./comments";
import bus_detail from "./bus_detail";
import NewBus from "./new_buses"
import All_seats from "./getSeat";
import N_seat from "./Create_seat";
import Drivers from "./Drivers";
import Get_users from "./Get_users";
import Notification from "./notification"
import D from "./alldrivers";

import ALL_users from './alldrivers';
import Get_tic from "./get_ticket";
import create_t from "./create_ticket";
import tickets from "./tickets";
import User_record from "./User_record";
import User from "./Account";
import NewDriver from "./New_driver";
import Component from "./component";
import Carts from "./Cartbox";
import B from "./busall";


const AppReducers=combineReducers({

    NewBus,
    NewDriver,
    Carts,
Bus_collection,
B,
Users,
User,
Drivers,
Orders,
Comments,
bus_detail,
All_seats,N_seat,
Get_users,
Notification,
D,
tickets,
User_record
,
ALL_users,
create_t,
Get_tic,Component




})


export default AppReducers