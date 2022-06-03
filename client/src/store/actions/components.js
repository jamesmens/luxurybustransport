import axios from "axios"
import {COMPONENT} from "../type"
import * as Item from "./index"
axios.defaults.headers.post["Content-Type"]="multipart/form-data"



export const Component_img=(id,value)=>{
    return async (dispatch)=>{
        try{
            const data=await axios.patch(`/bus/uploadcomponent/${id}`,value)

            dispatch(Item.notify_suc("Image modified!"))
          
        }
        catch(error){
      
            dispatch(Item.notify_error(error.response.data.msg))
            

        }
    }
}
export const  Component_store=(content)=>({
    type:COMPONENT,
    payload:content
})
export const Create_Component=(value)=>{
    return async (dispatch)=>{
        try{
            const data=await axios.post('/bus/createcomponent',value)
           
            dispatch(Item.notify_suc("Component created"))
         
        }
        catch(error){
            dispatch(Item.notify_error("component not created"))
         

        }
    }
}
export const Get_component=()=>{
    return async(dispatch)=>{
        try {
            const contents=await axios.get("/bus/get_component")
            dispatch(Component_store(contents.data))
                
        } catch (error) {
            Item.notify_error(error.response.data.msg)
        }
    }
}

export const modify_component=(value,id)=>{
    return async(dispatch)=>{
        try {
            const contents=await axios.patch(`/bus/modifycomponent/${id}`,value)
            dispatch(Item.notify_suc("Component modified"))
                     
        } catch (error) {
            Item.notify_error(error.response.data.msg)
        }
    }
}
export const Delete_com=(id)=>{
    return async(dispatch)=>{
        try{
            const content=await axios.delete(`/bus/deletecomponent/${id}`)
            dispatch(Item.notify_suc("component removed"))
        }
        catch(error){
            dispatch(Item.notify_error(error.response.data.msg))

        }
       

    }
}