import {NEWSEAT} from "../type"

export default function N_seat(state={},action){
    switch(action.type){

        case NEWSEAT:
            return {...state,N_S:action.payload}
        default:
            return state
    }
}