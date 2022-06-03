import React,{useState,useEffect} from "react"

import {useDispatch,useSelector} from "react-redux"
import moment from "moment"
import { Button } from "react-bootstrap"
import PrintT from "../Bookings/printTicket"
import { PayTicket } from "../../store/actions/bookings"

import {useNavigate} from "react-router-dom"






const Ticket=()=>{
    const history=useNavigate()
    const user=useSelector((state)=>state.User)
    useEffect(()=>{
      if(user && user.auth !==true){
        history("/")
  
  
      }
      if(user && user.data.role ==="admin"){
        history("/")
  
      }
      if(user && user.data.role ==="driver"){
        history("/")
  
      }
  
    })
 
    const dispatch=useDispatch()
    const Cart=useSelector((state)=>state.Carts)
    const [prints,setprint]=useState(false)
    return(
        <div className="ticket">

            <p style={{fontFamily:"frekoda",fontWeight:"bold",fontSize:"30px"}}>Checkout</p>
            <div  className="ticket_d">
                {
                    Cart && Cart.newt===true ?
                    <div className="ticket_center">
                     <p className="ticket_n">
                    <span className="ticket_na">
                        Bus number :

                    </span>

                    <span>
                        {
                            Cart.data.busNumber
                        }
                        
                    </span>
                </p>
                <p className="ticket_n">
                    <span className="ticket_na">
                       Fare :

                    </span>

                    <span>
                    GH₵   {
                            Cart.data.fare
                        }
                        
                    </span>
                </p>
                <p className="ticket_n">
                    <span className="ticket_na">
                        Seat number :

                    </span>

                    <span>
                        {
                            Cart.data.seatnumber
                        }
                        
                    </span>
                </p>
                <p className="ticket_n">
                    <span className="ticket_na">
                        Start point :

                    </span>

                    <span>
                        {
                            Cart.data.startpoint
                        }
                        
                    </span>
                </p>
                <p className="ticket_n">
                    <span className="ticket_na">
                        Destination :

                    </span>

                    <span>
                        {
                            Cart.data.destination
                        }
                        
                    </span>
                </p>
                <p className="ticket_n">
                    <span className="ticket_na">
                        Departure :

                    </span>

                    <span>
                        {
                           moment(Cart.data.departure).format("LLL") 
                        }
                        
                    </span>
                </p>
                <p className="ticket_n">
                    <span className="ticket_na">
                        customer :

                    </span>

                    <span>
                        {
                            Cart.data.username
                        }
                        
                    </span>
                </p>
                <p className="ticket_n">
                    <span className="ticket_na">
                        Customer Email :

                    </span>

                    <span>
                        {
                            Cart.data.email
                        }
                        
                    </span>
                </p>
                <p className="ticket_n">
                    <span className="ticket_na">
                        Customer Address :

                    </span>

                    <span>
                        {
                            Cart.data.address
                        }
                        
                    </span>
                </p>
               
                
                    </div>
                    :
                    <div>
                        <p>
                            No seat selected at the moment
                        </p>
                    </div>

                }
               

            </div>
            <>{
                Cart &&Cart.newt ? 
                <Button className="btnpayment" onClick={()=>setprint(!prints)}>Proceed to Payment</Button>
                :
                <Button className="btnpayment" onClick={()=>history("/")}>home</Button>
                
            }
            </>
           
          
            {
                prints ? 
                <PrintT printt={prints} setp={setprint} />:null
            }

        </div>
    )
}
export default Ticket;