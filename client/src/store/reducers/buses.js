import {Get_bus, Get_detail} from "../type"

    

    export default function Bus_collection(state={},action){
    
    switch(action.type){
        case Get_bus:
            return {...state,Buses:action.payload} 
    
        default:
            return state
    }
    
    }
 