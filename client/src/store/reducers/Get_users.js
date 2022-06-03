import { GET_USER} from "../type"


export default function Get_users(state={},action){
    switch(action.type){
        case GET_USER:
            return {...state, users:action.payload}
        default:
            return state
    }
}