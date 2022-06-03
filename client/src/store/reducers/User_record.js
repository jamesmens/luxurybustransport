import {User_data_record} from "../type"


export default function User_record(state={},action){
    switch(action.type){
        case User_data_record:
            return {...state,Records:action.payload}
        default:
            return state
    }
}