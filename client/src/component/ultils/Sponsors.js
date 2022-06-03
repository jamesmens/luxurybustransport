import React,{useEffect} from "react";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import RedeemIcon from '@mui/icons-material/Redeem';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AOS from "aos";
import "aos/dist/aos.css";
import {useSelector} from "react-redux"
import {
     Avatar,
 
} from "@material-ui/core";
const Sponsors = () => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    const Component=useSelector((state)=>state.Component)
    return (
        <div data-aos="fade-up"
        data-aos-anchor-placement="top-bottom" className="cases">
            <div className="P_F">
            
            <p style={{fontFamily:"frekoda",fontWeight:"bolder",fontSize:"25px"}}>OUR SPONSORS</p>

        </div>
        <div data-aos="flip-right" className="Sponsor_grid">
  
  {
                    Component && Component.main ? Component.main.filter((e) => e.type === "Sponsor").map((e, i) => {
                        return (
                            <div key={i}>

                                <div className="loc_box">
                                    <img className="sponsor_img"
                                        alt={
                                            e.content
                                        }
                                        src={
                                            e.photo
                                    }/>
                                   
                                   
                                </div>
                            </div>
                        )
                    }) : null
                } </div>
 
            </div>
           
            )
         }
                        
             export default Sponsors
