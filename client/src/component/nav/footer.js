import React from "react"
import { Button } from "react-bootstrap";
import {useFormik} from "formik"
import {NavLink} from "react-router-dom"
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AndroidIcon from '@mui/icons-material/Android';
import {

    TextField
   
} from "@material-ui/core";
import moment from "moment"
const Footer=()=>{
    const Formik=useFormik({
        initialValues:{
          message:""
    
        },
    
        onSubmit:(value,{reset})=>{
        
        
    
    
        }
      })

    return(<div className="footerdd">
    <div className="footer">
    <div >
            <div className="footer_h" >About luxurybus Services</div>
      <p className="footer_detail">
         <span>About us</span>
         <NavLink to="/site_location" className="link_foot"><span >Contact us</span></NavLink>
         
         <span className="link_foot">Mobile Version<a target="_blank" href="https://meetflo.zendesk.com/hc/en-us/articles/230425728-Privacy-Policies"><PhoneIphoneIcon/></a></span>
         
         
         <NavLink to="/site_location" className="link_foot"> <span >Branch on Map</span></NavLink>
      </p> </div>
      <div  >
<div className="footer_h">Legal </div>
<p className="footer_detail" >
    
  
    
    <NavLink to="/privacy_policy" className="link_foot"> <span>Privacy Policy</span></NavLink>
    <NavLink to="/refund_policy" className="link_foot">     <span>Refund Policy</span></NavLink>
    <NavLink to="/user_agree" className="link_foot"> <span>User Agreement</span></NavLink>

    <NavLink to="/application" className="link_foot"> <span>Bus operator Registration</span></NavLink>
   
</p>
  
      </div >
      <div >
            <div className="footer_h" >Our Partners</div>
      <p className="footer_detail">
         <span>Decreators.org (James mensah)</span>
      
      </p> </div>
     
      <div  className="about_l">
            <div className="footer_h" >Luxurybus transport</div>
      <p className="footer_detail">
         <span >Luxurybus transport is the Ghana's largest online bus ticket booking service trusted by over 1000 million happy customers. luxurybus  offers bus ticket booking through its website,iOS and Android mobile apps for all major routes</span>
      
      </p> </div>
      {/* <div className="message_user_c">
          <form className="message_user" onSubmit={Formik.handleSubmit}>


<Button>Send message</Button>


</form>
</div> */}
      
    </div>



    </div>)
}

export default Footer