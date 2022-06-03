import axios from "axios"
import {CART,CLEAR_CART} from "../type"
import * as Item from "./index"
axios.defaults.headers.post["Content-Type"]="application/json"
export const  Cart=(content)=>({
    type:CART,
    payload:content
})
export const Create_Cart=(value)=>{
    return async (dispatch)=>{
        try{
            dispatch(Cart({data:value[0],newt:true}))
            dispatch(Item.notify_suc("ok"))
           
         
        }
        catch(error){
            dispatch(Item.notify_error("component not created"))
         

        }
    }}

    export const cart_remove=(msg)=>{
        return(dispatch)=>{
          dispatch(
              {
                  type:CLEAR_CART
              }
          )
      
        }  
      
          
      }