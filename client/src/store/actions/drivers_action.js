import {GET_DRIVER,ALLDRIVER ,NEW_DRIVER} from "../type"
import axios from "axios";
import * as Toasti from "./index";
axios.defaults.headers.post["Content-Type"]="application/json"

export const DRIVERS=(value)=>({
    type:GET_DRIVER,
    payload:value
})

export const All_D=(value)=>({
    type:ALLDRIVER,
    payload:value
})

export const Created=(value)=>({
    type:NEW_DRIVER,
    payload:value
})

export const Alldriver=()=>{
    return async(dispatch,getState)=>{
        try{
            const new_drivers=await axios.get("/user/alldriver")
            dispatch(All_D(new_drivers.data))

 
      
        }
        catch(error){
     
        }
       
    }
}
export const triggerdriver=(value)=>{
    return async(dispatch,getState)=>{
        try{
            const new_drivers=await axios.post("/user/getalldriver",value)
            dispatch(DRIVERS(new_drivers.data))

 
        
        }
        catch(error){
            
        }
       
    }
}
//// for pagination

export const Get_driver=(value)=>{
    return async(dispatch,getState)=>{
        try{
            const new_drivers=await axios.post("/user/getalldriver",
        value)
const prev_d=getState().Drivers.AllDriver
      
    let load_d=[...new_drivers.data]
   
if(prev_d){
     load_d=[...prev_d,...new_drivers.data]
    
 }
 console.log(new_drivers)

            
 dispatch(DRIVERS(load_d))
           

        }
        catch(error){
            console.log(error)
        }
       
    }
}



export const Driver_del=(id)=>{
    return async (dispatch)=>{
        try{
           const driver=await axios.delete(`/user/deldriver/${id}`)
          
            dispatch(Toasti.notify_suc("user deleted"))

        }
        catch(error){
            console.log(error)

        }
    }
}
///// suspend driver
export const Driver_suspend=(id)=>{
    return async (dispatch)=>{
        try{
           const driver=await axios.patch(`/user/suspenddriver/${id}`)
            
            dispatch(Toasti.notify_suc(driver.data.msg))

        }
        catch(error){
            dispatch(Toasti.notify_error("action failed"))
            

        }
    }
}

///// suspend driver
export const Driver_unblock=(id)=>{
    return async (dispatch)=>{
        try{
           const driver=await axios.patch(`/user/unblockdriver/${id}`)
            
            dispatch(Toasti.notify_suc(driver.data.msg))

        }
        catch(error){
            dispatch(Toasti.notify_error("action  failed"))


        }
    }
}
/////////////////// invite applicant

export const Invite=(id,value)=>{
    return async (dispatch)=>{
        try{
            const driver=await axios.patch(`/user/approvedriver/${id}`,value)
           
            dispatch(Toasti.notify_suc("message sent"))

        }
        catch(error){
            dispatch(Toasti.notify_error("invite message failed"))

        }
    }
}

export const ModifyDriver=(id,value)=>{
    return async(dispatch)=>{
        try{
            const user=await axios.patch(`/user/modifydriver/${id}`,value)
            dispatch(Toasti.notify_suc("profile update!!"))

        }
        catch(error){
            dispatch(Toasti.notify_error(error.response.data.msg))
        }
        
       

    }
}
export const Driverapp=(value)=>{
    return async (dispatch)=>{
        try{
            const user= await axios.post("/user/driverapply",value)
            
            dispatch(Toasti.notify_suc("application gone through"))
             
           

        }
        catch(error){
            dispatch(Toasti.notify_error(error.response.data.msg))

        }
    }
}
///////////////// signup///////////////////////////////////////////////////



export const CreateDriver=(value)=>{
    return async (dispatch)=>{
        try{
            const user= await axios.post("/user/createdriver",value)
            dispatch(Created(user.data))


 dispatch(Toasti.notify_suc("account verified"))
             
           

        }
        catch(error){
            dispatch(Toasti.notify_error(error.response.data.msg))

        }
    }
}


export const Passwordforgot=(value)=>{
    return async (dispatch)=>{
        try{
            const user= await axios.post("/user/userforgotpass",value)
            dispatch(Toasti.notify_suc("Please check your email"))

        

        }
        catch(error){
           
            dispatch(Toasti.notify_suc("Invalid email !!"))

        }
    }
}
export const Verifypassword=(value)=>{
    return async (dispatch)=>{
        try{
            
            const user= await axios.patch("/user/passwordforgotreset",value)
          
 dispatch(Toasti.notify_suc("password successfully changed"))
             
           

        }
        catch(error){
          
            dispatch(Toasti.notify_error("token expired, start process again"))

        }
    }
}

export const ChangeDriverpassword=(id,value)=>{
    return async (dispatch)=>{
        try{
            const user= await axios.patch(`/user/driverResetPass/${id}`,value)
          
            dispatch(Toasti.Auth_User({data:user.data,auth:true}))
 dispatch(Toasti.notify_suc("Good !!, password changed"))
             
           

        }
        catch(error){
            dispatch(Toasti.notify_error(error.response.data.msg))

        }
    }
}
export const Refundtickets=(id,value)=>{
    return async (dispatch)=>{
        try{
            const user= await axios.post(`/user/ticketrefund/${id}`,value)
          
          
 dispatch(Toasti.notify_suc("good!, you well hear from Us after review"))
             
           

        }
        catch(error){
            dispatch(Toasti.notify_suc("error"))

        }
    }
}


