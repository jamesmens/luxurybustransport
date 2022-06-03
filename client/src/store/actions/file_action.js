import axios from "axios"
import * as NOtify from "./index"
axios.defaults.headers.post["Content-Type"]="multipart/form-data"
export const Upload_f=(value)=>{
    return async (dispatch)=>{
        try{
            const data=await axios.post('/upload',value)
            dispatch(NOtify.notify_suc("Image uploaded"))

        }
        catch(error){
            dispatch(NOtify.notify_error(error.response.data.msg))
            console.log(error)

        }
    }
}