import { USER_S} from "../type"


export default function Users(state={},action){
    switch(action.type){
        case USER_S:
            return {...state, account:action.payload}
        default:
            return state
    }
}