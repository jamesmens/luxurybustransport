import {GET_DRIVER}  from "../type"
export default function Drivers(state={},action){
    switch(action.type){
        case GET_DRIVER:
            return {...state,AllDriver:action.payload}
        default:
            return state
    }
}

