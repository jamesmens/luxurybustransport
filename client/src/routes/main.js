import React, { useEffect,useState } from "react"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import Home from "../component/home/index"
import Header from "../component/nav/header"
import UserHeader from "../component/nav/userHeader"
import Orders from "../component/orders"
import Hoc from "../component/hoc"

import Bus_detail from "../component/buses/bus_details"
import All_bus from "../component/buses/All_buses"
import Add_bus from "../component/buses/add_buses"
import AllDriver from "../component/Drivers/Drivers"
import Files from "../component/Drivers/file/file"
import Update_Bus from "../component/buses/update_bus"

import { ToastContainer } from 'react-toastify';
import Load_Home from "../component/buses/loadbus"
import 'react-toastify/dist/ReactToastify.css';
import AOS from "aos";
import "aos/dist/aos.css";


import Users_Account from "../component/users/users"
import Footer from "../component/nav/footer"
import VerifyPage from "../component/home/verificationPage"


import Messages from "../component/contacts/index"
import All_bookings from "../component/Bookings/All_bookings"
import All_users from "../component/users/All_users"
import Bookticket from "../component/Bookings/bookticket"
import Driverpage from "../component/Drivers/DriverPage"
import Userpage from "../component/users/userPage"
import { Auth_me } from "../store/actions/users_action"
import DriverRegistration from "../component/footer/driverRegister"
import CreateDrivers from "../component/home/verificationDriver"
import ForgotpassChange from "../component/ultils/passwordresetPage"
import SearchBus from "../component/ultils/SearchBus"
import Component_main from "../component/ultils/components"
import { Get_component } from "../store/actions/components"
import Site_location from "../component/ultils/Locations"
import User_agree from "../component/ultils/UserAgree"
import Privacy_policy from "../component/ultils/Privacy_policy"
import Refund_p from "../component/ultils/Refund_policies"
import Ticket from "../component/ultils/Ticket_page"

const Main =(props)=>{
    const dispatch=useDispatch()
    const account=useSelector((state)=>state.User)
    const [state,setstate]=useState("userpage")
    const userpage="upage"
    const operator="operator"
    const url=window.location.href

 
   useEffect(()=>{
    if(url.indexOf(userpage) >-1){
        setstate(userpage)
    }else{
        setstate("home")
    }
    if (url.indexOf(operator) >-1) {
        setstate(operator)
        
    }
    else{
        setstate("home")
    }
  
   })

   useEffect(()=>{
       dispatch(Auth_me())
       dispatch(Get_component())

   },[dispatch])
  
    useEffect(()=>{
AOS.init({duration:200})

    },[])
    useEffect(()=>{
        if(account && account.data.role==="admin" ){
            if(state !=operator){
                window.location.href = '/operator/adminhome'
            }
           

        }
      
    })
   
           

      
    
    return(
        <>
        <BrowserRouter>
        {
            state==="userpage" || state==="home" ? <UserHeader/>:<Header/>
        }
      
    
        <Routes>
        <Route path="/" element={<Home/>}></Route>
            <Route path="/upage" element={<Home/>}></Route>
<Route path="/operator/adminhome" element={<Load_Home/>}/>
<Route path="/operator/allbuses" element={<All_bus/>}></Route>
<Route path="/operator/all_books" element={<All_bookings/>}></Route>
<Route path="/upage/ticket/:id" element={<Bookticket/>}></Route>
<Route path="/operator/Bus/:id" element={<Bus_detail/>}/>
<Route path="/operator/addnew_bus/operator/Bus/:id" element={<Bus_detail/>}/>

<Route path="/operator/addnew_bus" element={<Add_bus/>}/>
<Route path="/operator/orders" element={<Orders/>}/>
<Route path="/operator/update_bus/:id" element={<Update_Bus/>}></Route>
<Route path="/operator/AllDrivers" element={<AllDriver/>}></Route>
<Route path="/operator/All_users" element={<All_users/>}></Route>

<Route path="/upage/user_msg" element={<Messages/>}></Route>
<Route path="/operator/file" element={<Files/>}></Route>
<Route path="/upage/sign" element={<Users_Account/>}></Route>
<Route path="/application" element={<DriverRegistration/>}></Route>
<Route path="/driverpage" element={<Driverpage/>}></Route>
<Route path="/verifydriver" element={<CreateDrivers/>}></Route>
<Route path="/userpanel" element={<Userpage/>}></Route>
<Route path="/passwordresetpage" element={<ForgotpassChange/>}></Route>
<Route path="/operator/component" element={<Component_main/>}></Route>
<Route path="/site_location" element={<Site_location/>}></Route>
<Route path="/user_agree" element={<User_agree/>}></Route>
<Route path="/privacy_policy" element={<Privacy_policy/>}></Route>    
 <Route path="/refund_policy" element={<Refund_p/>}></Route>
  <Route path="/ticketpurchase" element={<Ticket/>}/>
  <Route path="*" element={<p style={{height:"600px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}><span style={{fontFamily:"frekoda",fontWeight:"bolder",fontSize:"20px"}}>Ooops, page not fonud</span> </p>}></Route>
            <Route path="/verification" element={<VerifyPage/>}/>
        </Routes>

        
        <ToastContainer/>
        <Footer/>
        </BrowserRouter>
        
        </>
    )
}
export default Main
