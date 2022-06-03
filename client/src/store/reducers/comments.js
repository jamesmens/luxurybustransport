import { MSG_D,MSG,GET_MSG } from "../type"

export default function Comments(state={},action){
    switch(action.type){
        case MSG:
            return {...state,new_msg:action.payload}
        case GET_MSG:
            return {...state,allmsg:action.payload}
        case MSG_D:
            return {...state,msg_d:action.payload}
        default:
            return state
    }
}
