
import {
    Auth_user, SIGN_OUT
}

from "../type"


let users={
    data:{
        _id:"",
        email:null,
    password:null,
    role:null,
    firstname:null,
    lastname:null,
    age:null,
    address:null,
    phone:null,
    role:null,
    photo:"string",
    bus:[]

    },

   
    auth:null
}
export default function  User(state=users,action){

    switch(action.type){
        case Auth_user:
            return {...state,
                data:{...state.data,...action.payload.data},
               
                auth: action.payload.auth

                


            }
        case SIGN_OUT:
            return {...state,
                data:{...users.data},
                auth:false

            }
    
        default:
            return state
    }
    
    }