import React,{useEffect} from "react"
import {useSelector} from "react-redux";
import {Table} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import moment from "moment"
import { Loading } from "../ultils/Loading";
const UserBook=()=>{
const history=useNavigate()
    const userd=useSelector((state)=>state.User)
    useEffect(()=>{
      if(userd && userd.auth !==true){
        history("/")
  
  
      }
      if(userd && userd.data.role ==="admin"){
        history("/")
  
      }
      if(userd && userd.data.role ==="driver"){
        history("/")
  
      }
  
    })
    const bookt=useSelector((state)=>state.Get_tic)
    const User=useSelector((state)=>state.User)
    return(<div className="userbooks">
        <p style={{fontFamily:"frekoda",fontWeight:"bold"}}>user booking history</p>

        <div className="userbookt">
            {
                 
                 bookt  && bookt.bookings ?
                 <>
{
     bookt.bookings.filter((e)=>e.email===User.data.email).length <1 ?
     <p>Please you have not bboked a ticket yet</p>:

    <Table className="table" striped bordered hover>
                                    <thead className="table_hd"
                                    
                                    >
                                        <tr style={
                                            {
                                                fontFamily: "frekoda",
                                               
                                            }
                                        }>
                                            <th>Booked date</th>
                                            <th>ID</th>
                                <th>bus Number</th>
                                <th>Seat number</th>
                                <th>fare</th>
                                <th>Start Point</th>
                                <th>Destination</th>
                                <th>Departure</th>
                              
                                

    
                                        </tr>
    
                                    </thead>
                                    <tbody style={{backgroundColr:"white"}}
                                    >
                                        {
                                              
                                              bookt  && bookt.bookings ?
                             
                                             bookt.bookings.filter((e)=>e.email===User.data.email).map((ticket,i) => {
                                                    return (
                                                        <tr data-aos="fade-up" key={i}
                                                        data-aos-anchor-placement="center-bottom"
                                                        
                                                        >
                                                     
                                                             <td>{moment(ticket.createdAt).format("LL")}</td>
                                               <td>{ticket._id}</td>
                                               
                                             
                                                <td> {
                                                    ticket.busNumber
                                                } </td>
                                                 <td> {
                                                    ticket.seatnumber
                                                } </td>
                                                
                                                <td> GH₵ {ticket.fare}.00</td>
                                                <td>{ticket.startpoint}</td>
                                                <td>{ticket.destination}</td>
                                                <td>{moment(ticket.departure).format("LL")}</td>

                                              

                                                           
                                               
                                             

                                              
                                    
                                                        </tr>
            
                                                    )
                                                }) 
                                               
                                                :null}
                                     
                                     </tbody>
    
    
                                </Table>



}

                 </>:null
                                 
                



            }

       
        </div>

    
    
    
    
    
    </div>)
}
export default UserBook;