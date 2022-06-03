import {NEW_DRIVER } from "../type";

export default function NewDriver(state={},action){
    switch(action.type){
        case NEW_DRIVER:
            return {...state,new_driver:action.payload}
        default:
            return state

    }

}