import { GET_BOOKING} from "../type";

export default function Get_tic(state={},action){
    switch(action.type){
        case GET_BOOKING :
             return {...state,bookings:action.payload}
        default:
            return state

    }

}