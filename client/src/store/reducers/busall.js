import {BUSMAIN}  from "../type"
export default function B(state={},action){
    switch(action.type){
        case BUSMAIN:
            return {...state,bus:action.payload}
        default:
            return state
    }
}

