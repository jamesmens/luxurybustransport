import React from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Loading } from "./Loading";
import {useSelector} from "react-redux"
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import {useNavigate} from "react-router-dom"
const User_agree=()=>{

    const Component=useSelector((state)=>state.Component)
    const history=useNavigate()
    return(
    <>
        {Component && Component.main ?
        <div>
            <div onClick={()=>history("/")} className="page_h"><TurnLeftIcon/> Home</div>
              <div className="site">
            
            <h1 className="link_footer" >USER AGREEMENT</h1>
          
                       <div className="plate">
                           <p className="link_footer">The User must be atleast 18 years of age and must possess the legal authority to enter into an agreement so as become a User and use the services of Luxurytransport. If you are a minor or are below the age of 18 years, you shall not register as a User of the Website and shall not transact on or use the Website.</p>
<p className="link_footer"> As a minor if you wish to use or transact on the Website, such use or transaction shall only be made by a person of legal contracting age (legal guardian or parents). We reserve the right to terminate your membership and/or block access to the Website if it is discovered that you are a minor or incompetent to contract according to the law or any information pertaining to your age entered at the time of creation of account is false.</p>
<p className="link_footer"> Before using the Website, approaching any Sales Channels or procuring the services of Luxurytransport, the Users shall compulsorily read and understand this User Agreement, and shall be deemed to have accepted this User Agreement as a binding document that governs User’s dealings and transactions with Luxurytransport. If the User does not agree with any part of this Agreement, then the User must not avail Luxurytransport's services and must not access or approach the Sales Channels of Luxurytransport.</p>
<p className="link_footer"> All rights and liabilities of the User and Luxurytransport with respect to any services or product facilitated by Luxurytransport shall be restricted to the scope of this User Agreement.</p>
<p className="link_footer"> User shall not distribute exchange, modify, sell or transmit anything from the Website, including but not limited to any text, images, audio and video, for any business, commercial or public purpose.</p>
<p className="link_footer"> The User Agreement grants a limited, non-exclusive, non-transferable right to use this Website as expressly permitted in this User Agreement. The User agrees not to interrupt or attempt to interrupt the operation of the Website in any manner whatsoever</p>
<p className="link_footer">Access to certain features of the Website may only be available to registered User(s). The process of registration, may require the User to answer certain questions or provide certain information that may or may not be personal in nature. Some such fields may be mandatory or optional. User represents and warrants that all information supplied to Luxurytransport is true and accurate.</p>
    <p className="link_footer" >Luxurytransport reserves the right, in its sole discretion, to terminate the access to the Website and the services offered on the same or any portion thereof at any time, without notice, for general maintenance or any other reason whatsoever.</p>                 
                       </div>
      
           
             
    
        </div>
        </div>
          

        : <Loading/> }
        </>
       )
}

export default User_agree