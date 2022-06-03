import React ,{useState,useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {useSearchParams} from "react-router-dom"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {Loader} from "../ultils/Loading"

const iconStyle = {
    fontSize:"200px"
}
const Verify_A=()=>{


    const [icon,setIcon]=useState(null)
    const [loading,setloading]=useState(true);
    const dispatch=useDispatch();
    const [useSearch]=useSearchParams()

const token=useSearch.get("t")
useEffect(()=>{
    if(token){

    }
    else{
        props.history.push("/")
    }
})
useEffect(()=>{
    if(notifications && notifications.error){
        setIcon(<SentimentVeryDissatisfiedIcon style={iconStyle}/>)
        setLoading(false)
    }
    if(notifications && notifications.success){
        setIcon(<SentimentSatisfiedAltIcon style={iconStyle}/>)
        setLoading(false)
    }
},[notifications])

    return(<>
{
    loading ?
    <Loader/>:
    <div>

    </div>

}

    </>)
}
export default Verify_A