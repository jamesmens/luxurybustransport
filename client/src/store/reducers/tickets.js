import {All_t} from "../type"
export default function tickets(state={},action){
    switch(action.type){
        case All_t:
            return {...state,books:action.payload}
        default:
            return state
    }
}