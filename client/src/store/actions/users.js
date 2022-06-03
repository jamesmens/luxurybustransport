import axios from "axios";
import * as Users from "./index"
axios.defaults.headers.post["Content-Type"]="application/json"


export const Get_Users_accout=(value)=>{
    return async(dispatch,getstate)=>{
        try {
            const user=await axios.post("/users/",value)
            dispatch(Users.Get_users(user.data))


        } catch (error) {
            
        }



    }

}

