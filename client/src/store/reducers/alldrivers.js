import {ALLDRIVER}  from "../type"
export default function D(state={},action){
    switch(action.type){
        case ALLDRIVER:
            return {...state,AllD:action.payload}
        default:
            return state
    }
}

