import { New_buse } from "../type";

export default function NewBus(state={},action){
    switch(action.type){
        case New_buse:
            return {...state,new_b:action.payload}
        default:
            return state

    }

}