import {TICKET} from "../type"
export default function create_t(state={},action){
    switch(action.type){
        case TICKET:
            return {...state,...action.payload}
        default:
            return state
    }
}