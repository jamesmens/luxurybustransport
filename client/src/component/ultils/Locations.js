import React,{useEffect} from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Loading } from "./Loading";
import {useSelector} from "react-redux"
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import {useNavigate} from "react-router-dom"
import AOS from "aos";
import "aos/dist/aos.css";
const Site_location=()=>{

    const Component=useSelector((state)=>state.Component)
    const history=useNavigate()
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    return(
    <>
        {Component && Component.main ?
        <div >
            <div onClick={()=>history("/")} className="page_h"><TurnLeftIcon/> Home</div>
              <div className="site">
            <LocationOnIcon fontSize="large"/>
            <a className="link_footer" target='blank' href="https://goo.gl/maps/2iszzzyRKXnqj26NA">View location on map</a>
           <div>{
               Component && Component.main ?
               Component.main.filter((item)=>item.type==="Location").map((i)=>{
                   return(
                       <div className="plateimg" key={i} data-aos="fade-up"
                       data-aos-anchor-placement="center-bottom">
                       <img className="site_img" alt={i.content} src={i.photo}/>
                       </div>
                   )
               })
          :null }
           
               </div> 
    
        </div>
        </div>
          

        : <Loading/> }
        </>
       )
}

export default Site_location