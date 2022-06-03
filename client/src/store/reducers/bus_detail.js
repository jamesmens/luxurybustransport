import { Get_detail } from "../type"


export default function bus_detail(state={},action){
    switch(action.type){
        case Get_detail:
            return {...state,bus_d:action.payload}
        default:
            return state
    }
}