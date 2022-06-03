

import axios from "axios"
import * as Ticket from "./index"

axios.defaults.headers.post["Content-Type"]="application/json"
export const Get_booking=()=>{
    return async(dispatch)=>{
       try{
        const tickets=await axios.post("/booking/bookings")
        dispatch(Ticket.Get_ticket(tickets.data))


       }
       catch(error){

       }

    }
}

/////////////////////// load pagination
export const All_tickets=(value)=>{
return async(dispatch,getdispatch)=>{
    try{
const datas=await axios.post("/booking/getbookings", value)
let new_t=[...datas.data]
const prev=getdispatch().tickets.books
if(prev){
    new_t=[...prev,...datas.data]
}
dispatch(Ticket.all_ticket(new_t))

    }
    catch(error){

    }
}

}

export const  Create_Ticket=(value)=>{
    return async(dispatch)=>{
        try {
            const n_ticket=await axios.post("/booking/ticket", value)
            dispatch(Ticket.Ticket(n_ticket.data))
            dispatch(Ticket.notify_suc("ticked purchased"))
        } catch (error) {
           
        }
    }
}

/// payment
export const  PayTicket=(value)=>{
    return async(dispatch)=>{
        try {
            const n_ticket=await axios.post("/booking/ticketpayment", value)
            dispatch(Ticket.notify_suc("cost recieve"))
            
        } catch (error) {
            
        }
    }
}

