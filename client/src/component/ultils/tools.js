import { toast } from 'react-toastify';

 import cookie from "react-cookies"
export const ShowToast = (type,msg) => {
    switch(type){
        case 'SUCCESS':
            toast.success(msg,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
          
        break;
        case 'ERROR':
            toast.error(msg,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        break;
        default:
            return false
    }
}

 export const getTokenCookie = () => cookie.load('x-auth');

export const removeCookie = () => cookie.remove('x-auth');
export const  getAuthHeader={
    headers:{
        "x-auth":getTokenCookie()
    }
}

