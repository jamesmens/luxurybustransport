
import {
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATION,
    REMOVE
} from "../type";

export default function Notification(state={},action){
    switch(action.type){
        case ERROR_GLOBAL:
            return { ...state, error: true, msg:action.payload }
        case SUCCESS_GLOBAL:
            return { ...state, success: true, msg:action.payload }
        case CLEAR_NOTIFICATION:
            return {}
        case REMOVE:
            return {...state,removeArticle: true }
        default:
            return state
    }
}