import { A_USER} from "../type"


export default function ALL_users(state={},action){
    switch(action.type){
        case A_USER:
            return {...state,Detail:action.payload}
        default:
            return state
    }
}