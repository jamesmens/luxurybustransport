import React,{useState,useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import CancelIcon from '@mui/icons-material/Cancel';
import {Table,Pagination,Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import moment from "moment"
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Create_Ticket } from "../../store/actions/bookings";
import { BookSeat } from "../../store/actions/buses_action";
import { cart_remove } from "../../store/actions/Cart";
const PrintT=(props)=>{
    const history=useNavigate()
    const user=useSelector((state)=>state.User)
   
    useEffect(()=>{
        if(user.auth && user.data.role==="admin"){
            history("/")
        }
        if(user.auth && user.data.role==="driver"){
            history("/")
        }
    })
const dispatch=useDispatch()
    const [number,setnumber]=useState('')
    const [name,setname]=useState('')
    const ticketd=useSelector((state)=>state.Get_tic)
    const [exp,setexp]=useState('')
    const [cvc,setcvc]=useState('')
    const [focus,setfocus]=useState('')
    const Cart=useSelector((state)=>state.Carts)
    const [pay,setpay]=useState(false)
    const componentRef = useRef();
    const User=useSelector((state)=>state.User)
    let userd=User.data;
    return(
        <div  className="register_option">
            <div className="register_container"> 
            <div  style={{display:"flex", alignContent:"end",justifyContent:"right",width:"100%",marginTop:"-40px",cursor:"pointer",marginLeft:"5px"}}><CancelIcon  onClick={()=>{
               props.setp(!props.printt)
                }} fontSize="large" /></div>
                {
                    pay ?
                    <>
                    { ticketd && ticketd.bookings ?
                    <div className="register_box" >
                    <div ref={componentRef} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    <div >
                        {User && User.auth===true ?
                        <>
                        <p>Name :<span> {userd.firstname + " " + userd.lastname}</span></p>
                        <p>Email :<span> {userd.email}</span></p>
                        <p>Address :<span> {userd.address}</span></p>
                        <p>Date : <span>{moment(ticketd.bookings.createdAt).format("LL")}</span></p>
                        </>:null}
                    </div>
                    <span style={{height:"1px",width:"100%",backgroundColor:"black"}}></span>
                    <div className="receiptp" style={{marginTop:"20px"}}>
                        <Table >
                            <thead >
                                <tr>
                                    <th>ID</th>
                                    <th>Bus number</th>
                                    <th>Seat number</th>
                                    <th>Fare</th>
                                    <th>Startpoint</th>
                                    <th>Destination</th>
                                    <th>Departure</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{ticketd.bookings._id}</td>
                                    <td>{ticketd.bookings.busNumber}</td>
                                    <td>{ticketd.bookings.seatnumber}</td>
                                    <td>{ticketd.bookings.fare}</td>
                                    <td>{ticketd.bookings.startpoint}</td>
                                    <td>{ticketd.bookings.destination}</td>
                                    <td>{moment(ticketd.bookings.departure).format("LLL")}</td>
                                </tr>
                            </tbody>
                        </Table>
         
                    </div>
                  <p> Note !<span style={{fontWeight:"bold",fontFamily:"frekoda"}}> this receipt can be used as <br>
                  </br>proof for ticket checking purposes on departure </span></p> 
               
                   
                 
                </div>
                <ReactToPrint
                 trigger={() => <button>Print this out!</button>}
                 content={() => componentRef.current}
               />
                </div>:null}
                    </>
                     :
       <div className="register_box" >
       <p style={{fontFamily:"frekoda",fontWeight:"bolder"}}>
           PAYOUT
       </p>
       <p>Amount: <span>GH₵ {Cart.data.fare}</span></p>
      <div className="cardd">
       <form className="paymentform">
           <input className="inputpay" type="text" name="name" placeholder="Holder Name" value={name} onChange={(e)=>setname(e.target.value)}
           onFocus={(e)=>setfocus(e.target.name)} />
            <input className="inputpay" type="tel" name="number" placeholder="Card Number" value={number} onChange={(e)=>setnumber(e.target.value)}
           onFocus={(e)=>setfocus(e.target.name)} ></input>
            <input className="inputpay" type="text" name="expiry" placeholder="MM/YY Expiry" value={exp} onChange={(e)=>setexp(e.target.value)}
           onFocus={(e)=>setfocus(e.target.name)} ></input>  
           <input className="inputpay" type="tel" name="cvc" placeholder="CVC" value={cvc} onChange={(e)=>setcvc(e.target.value)}
           onFocus={(e)=>setfocus(e.target.name)} ></input>
           
       </form>
       <Cards style={{width:"40px"}}
       number={number}
       name={name}
       expiry={exp} 
       cvc={cvc}
       focused={focus}
       /></div>
       {
           (number !=="" && exp !=="" && cvc !=="" && name !=="" ) ?
           <Button onClick={()=>{
            if(number !=="" && exp !=="" && cvc !=="" && name !==""){
             dispatch(BookSeat(Cart.data.id,Cart.data.seatnumber))
             dispatch(Create_Ticket(Cart.data))
                        setTimeout(()=>{
                         setpay(true)
                         dispatch(cart_remove())

                        },3000
                     )
            }
           
      
        }} style={{margin:"50px"}}>Comfirm Payment</Button>:<p>provide detail to process</p>


       }
       
        </div>

       

                }
      
       </div>
        </div>
    )
}

export default PrintT