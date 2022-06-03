import axios from "axios"
import * as Toasti from "./index";



axios.defaults.headers.post["Content-Type"]="application/json"
//////////////user image
export const User_imgs=(id,file)=>{
    return async (dispatch)=>{
    try{
    const update =await axios.patch(`/bus/userimg/${id}`,file)
    dispatch(Toasti.Auth_User({data:update.data,auth:true}))
    dispatch(Toasti.notify_suc("Good, image uploaded"))
    console.log("image")
    }
    catch(error){
        console.log("image fail")
       dispatch( Toasti.notify_error(error.response.data.msg))
    
    }
    }
    }

    /// driver img
    export const Driver_imgs=(id,file)=>{
        return async (dispatch)=>{
        try{
        const update =await axios.patch(`/bus/driverimg/${id}`,file)
        dispatch(Toasti.Auth_User({data:update.data,auth:true}))
        dispatch(Toasti.notify_suc("Good, image uploaded"))
        }
        catch(error){
            dispatch( Toasti.notify_error(error.response.data.msg))
        
        }
        }
        }
   
    
    