import React from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Loading } from "./Loading";
import {useSelector} from "react-redux"
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import {useNavigate} from "react-router-dom"

const Refund_p=()=>{

    const Component=useSelector((state)=>state.Component)
    const history=useNavigate()
    return(
    <>
        {Component && Component.main ?
        <div>
            <div onClick={()=>history("/")} className="page_h"><TurnLeftIcon/> Home</div>
              <div className="site">
            
            <h1 className="link_footer" >REFUND POLICY</h1>
          
                       <div className="plate">
        <p className="link_footer">1. The User must be atleast 18 years of age and must possess the legal authority to enter into an agreement so as become a User and use the services of Luxurytransport. If you are a minor or are below the age of 18 years, you shall not register as a User of the Website and shall not transact on or use the Website.</p>

<p className="link_footer"> 2. Upon cancellation, the discount amount, travel insurance, processing fee and rewards, including but not limited to, BOT Miles or BOT Wallet redeemed in the booking will not be returned in any form of amount.</p>
<p className="link_footer"> 3. Once the cancellation is confirmed, the particular booking record will be removed from customer’s booking history and the cancellation is irreversible</p>
<p className="link_footer">4. Ticket(s) collected or exchanged at the counter cannot be cancelled or refunded</p>
<p className="link_footer">5. The refund amount will be based on the Refundable Amount that is stated in the Refund Policy, maximum capped at the payable amount for the ticket price</p>
<p className="link_footer">6. Unless stated otherwise, all refunds will be refunded back via the payment method stated on the refund confirmation email within 14 business days.</p>
    <p className="link_footer" >7. The management of Luxurytransport service reserves the right to change the terms and conditions of this Refund Policy without prior notice</p>                 
    <p className="link_footer"> 8. This Refund Policy shall only be applicable for selected operators with its terms. Please refer to Operators’ Refund Policy.</p>    
                       </div>
      
           
             
    
        </div>
        </div>
          

        : <Loading/> }
        </>
       )
}

export default Refund_p