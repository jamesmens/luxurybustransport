import { SEATS,Get_bus } from "../type"


export default function All_seats(state={},action){
    switch(action.type){
        case SEATS:
            return {...state,SEATS:action.payload}
        default:
            return state
    }
}