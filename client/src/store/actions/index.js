import {Get_bus,Get_user,Get_comment,Get_orders,Get_detail,All_t, New_buse,SEATS,NEWSEAT,  ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    REMOVE,
    Auth_user,
    SIGN_OUT,
    BUSMAIN,
GET_BOOKING,TICKET} from "../type"

export const Get_buses=(buses)=>({
    type:Get_bus,
    payload:buses

})
export const Get_bus_detail=(detail)=>({
    type:Get_detail,
    payload:detail

})

export const Get_users=(users)=>({
    type:Get_user,
    payload:"god"
})
export const Comments=()=>({
    type:Get_comment,
    paylaod:Get_comment
})

export const New_buses=(bus)=>({
    type:New_buse,
    payload:bus
})
export const Get_s=(seat)=>({
    type:SEATS,
    payload:seat

})
export const Create_s=(item)=>({
    type:NEWSEAT,
    payload:item
})

export const notify_suc=(msg)=>({
    type :SUCCESS_GLOBAL,
    payload:msg

})
export const notify_error=(msg)=>({
    type:ERROR_GLOBAL,
    payload:msg
    
})
export const notify_remove=(msg)=>{
  return(dispatch)=>{
    dispatch(
        {
            type:CLEAR_NOTIFICATION
        }
    )

  }  

    
}
export const main_buses=(value)=>({
    type:BUSMAIN,
    payload:value
})

export const Get_ticket=(ticket)=>({
type:GET_BOOKING,
payload:ticket
})
export const Ticket=(newt)=>({
    type:GET_BOOKING,
    payload:newt
    })
 export  const all_ticket=(ticket)=>({
     type:All_t,
     payload:ticket
 })

 export const Auth_User=(users)=>({
    type:Auth_user,
    payload:users
})

export const Sign_out=()=>({
    type: SIGN_OUT,
    
})