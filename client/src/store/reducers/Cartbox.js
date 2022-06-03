
import {
    CART, CLEAR_CART
}

from "../type"


let cart={
    data:{
        firstname:null,
        lastname:null,
        email:null,
        id:null,
    
        address:null,
    busNumber:null,
    seatnumber:"",
    photo:null,
    departure:null,
    startpoint:null,
    destination:null,
    fare:null
    

    },

   
    newt:null
}
export default function  Carts(state=cart,action){

    switch(action.type){
        case CART:
            return {...state,
                data:{...state.data,...action.payload.data},
               
                newt: action.payload.newt

                


            }
        case CLEAR_CART:
            return {...state,
                data:{...cart.data},
                newt:false

            }
    
        default:
            return state
    }
    
    }