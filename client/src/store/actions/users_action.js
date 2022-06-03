
import axios from "axios"

import * as Toasti from "./index";
import {removeCookie,getAuthHeader} from "../../component/ultils/tools"

import {GET_USER,USER_S,USER_L,D_REGISTER,A_USER,User_data_record} from "../type"
axios.defaults.headers.post["Content-Type"]="application/json"
///////////////////////////////////////////////// msg////////////////////////////////
export const USERS=(value)=>({
    type:GET_USER,
    payload:value
})


export const Get_user=(value)=>{
    return async (dispatch)=>{
        try{
            const users=await axios.post("/user/alluser")
            dispatch(USERS(users.data))
       

        }
        catch(error){
            console.log(error)
        }


    }
}


//////////////// for paginations
export const USERD=(value)=>({
    type:A_USER,
    payload:value
})




///////////////////////////////////////////////////////////////////////////
export const User_ac=(value)=>({
    type:USER_S,
    payload:value
})


export const RegisterU=(value)=>{
    return async (dispatch)=>{
        try{
            const user= await axios.post("/user/preregister",value)
            
            dispatch(Toasti.notify_suc(user.data))
             
           

        }
        catch(error){
            dispatch(Toasti.notify_error(error.response.data.msg))

        }
    }
}
///////////////// signup///////////////////////////////////////////////////



export const CreateUser=(value)=>{
    return async (dispatch)=>{
        try{
            const user= await axios.post("/user/createuser",value)
            dispatch(User_ac(user.data))


 dispatch(Toasti.notify_suc("ok"))
             
           

        }
        catch(error){
            dispatch(Toasti.notify_error(error.response.data.msg))

        }
    }
}

export const SignAccount=(value)=>{
    return async(dispatch)=>{
        try{
            const account=await axios.post("/user/signin",value)
            dispatch(Toasti.Auth_User({data:account.data,auth:true}))
            dispatch(Toasti.notify_suc(`Hi, ${account.data.username} good to have you back`))
        }
        catch(error){
            dispatch(Toasti.notify_error(error.response.data.msg))
        }
       
    }
    
}



///////////////////////////////////////////////////
export const Get_account_msg=()=>{
    return async (dispatch)=>{
try{
const msg=await axios.post("/users/msg")
}
catch(error){

}

    }
}
/////////////////////////////////////////////////////////////////////////////////////////
export const Auth_me=()=>{
    return async (dispatch)=>{
        try {
            const user=await axios.get("/user/profile",getAuthHeader)
            dispatch(Toasti.Auth_User({data:user.data,auth:true}))
           

        } catch (error) {
            
        }
    }
}

export const Sign_out=()=>{
   return async (dispatch)=>{
 
          removeCookie()
           dispatch(Toasti.Sign_out())

    
   }

}


export const ModifyUser=(id,value)=>{
    return async(dispatch)=>{
        try{
            const user=await axios.patch(`/user/modifyuser/${id}`,value)
            dispatch(Toasti.Auth_User({data:user.data,auth:true}))
            dispatch(Toasti.notify_suc("profile update!!"))

        }
        catch(error){
            dispatch(Toasti.notify_error(error.response.data.msg))
        }
        
       

    }
}
export const User_data=(values)=>({
    type:User_data_record,
    payload:values
})


    export const UserRecords=(value)=>{
        return async(dispatch,getState)=>{
            try{

                const users=await axios.post("/user/getallu",
            value)
   
            const prev_d=getState().User_record.Records
      
            let load_d=[...users.data]
           
        if(prev_d){
             load_d=[...prev_d,...users.data]
            
         }
       
        
                    
         dispatch(User_data(load_d))
    
            }
            catch(error){
               
            }
           
        }
    }
    
    
export const ChangeUserpassword=(id,value)=>{
    return async (dispatch)=>{
        try{
            const user= await axios.patch(`/user/userResetPass/${id}`,value)
          
            dispatch(Toasti.Auth_User({data:user.data,auth:true}))
 dispatch(Toasti.notify_suc("password successfully changed "))
             
           

        }
        catch(error){
            dispatch(Toasti.notify_error(error.response.data.msg))

        }
    }
}


///// suspend driver
export const User_suspend=(id)=>{
    return async (dispatch)=>{
        try{
           const driver=await axios.patch(`/user/suspenduser/${id}`)
            
            dispatch(Toasti.notify_suc("user blocked"))

        }
        catch(error){
            console.log(error)

        }
    }
}

///// suspend user
export const User_unblock=(id)=>{
    return async (dispatch)=>{
        try{
           const driver=await axios.patch(`/user/unblockuser/${id}`)
            
            dispatch(Toasti.notify_suc("user unblocked"))

        }
        catch(error){
            console.log(error)

        }
    }
}