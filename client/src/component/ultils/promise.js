import React,{useEffect} from "react";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import RedeemIcon from '@mui/icons-material/Redeem';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AOS from "aos";
import "aos/dist/aos.css";
const PromiseCon = () => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    return (
        <div className="cases">
            <div className="P_F">
            <VerifiedUserIcon fontSize="large" className="pp"/>
            <p style={{fontFamily:"frekoda",fontWeight:"bolder",fontSize:"25px"}}>WE PROMISE TO DELIVER</p>

        </div>
    <div className="Security">
        
        <div data-aos="zoom-out-up" className="promise_main">
            <div className="P_F">
                <SupportAgentIcon fontSize="large" className="pf"/>
                <p>SUPERIOR CUSTOMER SERVICE</p>
                <p>We put our experience and relationships to good use and are available to solve your travel issues.</p>
            </div>

            <div  className="P_F">

                <RedeemIcon fontSize="large" className="pf"/>
                <p>OTHER BENEFITS</p>
                <p>We take care of your travel beyond ticketing by providing you with innovative and unique benefits.</p>
            </div>
            <div className="P_F">

                <PriceCheckIcon fontSize="large" className="pf"/>
                <p>LOWEST PRICES</p>
                <p>We always give you the lowest price with the best partner offers.</p>

              </div>

            </div>
            </div>
            </div>
            )
         }
                        
             export default PromiseCon
