import axios from "axios";
import {MSG,GET_MSG,MSG_D} from "../type"
import * as Toasti from "./index";
axios.defaults.headers.post["Content-Type"]="application/json"


export const Msg_c=(msg)=>({
    type:MSG,
    payload:msg

})

////// / 
export const Contact_msg=(value)=>{
    return async(dispatch,getdispatch)=>{
        try{
            const msg=await axios.post("/comments/newcomment",value)
          
            dispatch(Toasti.notify_suc("Message sent !"))
          


        }catch(error){
         

        }
    }
}
export const Get_msg=(msg)=>({
    type:GET_MSG,
    payload:msg

})
export const Getmsg=(msg)=>{
    return async(dispatch)=>{
        try{
const allmsg=await axios.post("/comments/getmsg")
dispatch(Get_msg(allmsg.data))

        }
        catch(error){

        }
    }
}


export const Msg=(msg)=>({
    type:MSG_D,
    payload:msg
})

export const Msg_d=(value)=>{
    return async (dispatch)=>{
       try {
        const details=await axios.get("/usermsg/msgdetails")
        dispatch(Msg(details.data))
       } catch (error) {
           
           
       }

    }
}
