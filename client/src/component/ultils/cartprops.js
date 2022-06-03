
import React from "react"
import CancelIcon from '@mui/icons-material/Cancel';
const Cartprop=(props)=>{
    return(<div  className="register_option">
        <div className="register_container"> 
        <div  style={{display:"flex", alignContent:"end",justifyContent:"right",width:"100%",marginTop:"-40px",cursor:"pointer",marginLeft:"5px"}}><CancelIcon  onClick={()=>{
            props.setcprop(!props.cartp)
           }} fontSize="large" /></div>
   <div className="register_box">
       <h1>Hi, lets get started!</h1>
       <div>
           <p className="instrucp"><span className="instrut">1</span> SIGN UP</p>
           <p className="instrucp"><span className="instrut">2</span> SEARCH FOR AVAILABLE BUS</p>
           <p className="instrucp"><span className="instrut">3</span> SELECT A SEAT</p>
       </div>
  

    
   </div>
   </div>
    </div>)
}
export default Cartprop