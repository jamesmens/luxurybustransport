import React from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Loading } from "./Loading";
import {useSelector} from "react-redux"
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import {useNavigate} from "react-router-dom"
const Privacy_policy=()=>{

    const Component=useSelector((state)=>state.Component)
    const history=useNavigate()
    return(
    <>
        {Component && Component.main ?
        <div>
            <div onClick={()=>history("/")} className="page_h"><TurnLeftIcon/> Home</div>
              <div className="site">
            
            <h1 className="link_footer" >PRIVACY POLICY</h1>
          
                       <div className="plate">
                          
<p className="link_footer">Decreators.org (hereinafter “luxurytransport service”) recognizes the importance of privacy of its users and also of maintaining confidentiality of the information provided by its users as a responsible data controller and data processor.

This Privacy Policy provides for the practices for handling and securing user's Personal Information (defined hereunder) by Luxurytransport and its subsidiaries and affiliates.

This Privacy Policy is applicable to any person (‘User’) who purchases, intends to purchase, or inquire about any product(s) or service(s) made available by Luxurytransport through any of redBus’s customer interface channels including its website, mobile site, mobile app & offline channels including call centers and offices (collectively referred herein as "Sales Channels").

For the purpose of this Privacy Policy, wherever the context so requires "you" or "your" shall mean User and the term "we", "us", "our" shall mean Luxurytransport. For the purpose of this Privacy Policy, Website means the website(s), mobile site(s) and mobile app(s).

By using or accessing the Website or other Sales Channels, the User hereby agrees with the terms of this Privacy Policy and the contents herein. If you disagree with this Privacy Policy please do not use or access our Website or other Sales Channels.

This Privacy Policy does not apply to any website(s), mobile sites and mobile apps of third parties, even if their websites/products are linked to our Website. User should take note that information and privacy practices of redBus’s business partners, advertisers, sponsors or other sites to which Luxurytransport provides hyperlink(s), may be materially different from this Privacy Policy. Accordingly, it is recommended that you review the privacy statements and policies
 of any such third parties with whom they interact.</p>

                       </div>
      
           
             
    
        </div>
        </div>
          

        : <Loading/> }
        </>
       )
}

export default Privacy_policy