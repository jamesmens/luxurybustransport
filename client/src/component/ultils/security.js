import React,{useEffect} from "react";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { makeStyles } from '@material-ui/core/styles';
import AOS from "aos";
import "aos/dist/aos.css";
const Security=()=>{
    const useStyle = makeStyles((theme) => ({
        Icon_IMG: {
          '& svg': {
            fontSize: 2770,

          },
         
        } 
        

      }));
      useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
      const classes=useStyle()
    return(
        <div data-aos="fade-up"
        data-aos-duration="800" className="cases">
        <div className="Security">
            <div className="SEC_F">
                <div><MedicalServicesIcon style={{color:"#176e19"}} className={classes.Icon_IMG} fontSize="large" /></div>
                <div className="SEC_FA">
                    <h1 className="SEC_FAH">Safety +</h1>
                    <p >Opt to Travel with Luxury transport Service </p>
                </div>
            </div>
            <div className="SEC_S"><EmojiObjectsIcon style={{color:"#eacf58"}} fontSize="large" /> Looking for buses with  safety tag for your journey</div>
            <div className="SEC_L">
                <div>
                    <p className="case_h">Sanitized Bus</p>
                    <p>All Safety+ buses are sanitized and disinfected before and after every trip.</p>
                </div>
                
                <div>
                <p className="case_h">Mandatory masks</p>
                    <p>Proper masks are mandatory for all passengers and bus staff.</p>
                </div>
                <div>
                <p className="case_h">Thermal Screening</p>
                    <p>
All passengers will undergo thermal screening. Temperature checks for bus drivers and service staff are done before every trip.</p>
                </div>
            </div>
           


        </div>
        </div>
    )
}

export default Security