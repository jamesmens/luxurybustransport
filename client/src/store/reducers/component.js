import { COMPONENT } from "../type"

export default function Component(state={},action){
    switch(action.type){
        case  COMPONENT : 
            return {...state,main:action.payload}
      
        default:
            return state
    }
}
