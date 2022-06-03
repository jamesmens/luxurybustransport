import React,{useEffect} from "react"
import {CreateUser} from "../../store/actions/users_action"
import {useSearchParams} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {Button} from "react-bootstrap"
const VerifyPage=()=>{
    const [searchParams] = useSearchParams();
    const token=searchParams.get("t")
    const dispatch=useDispatch()
    const notification=useSelector((state)=>state.Notification)
    const userDetail=useSelector((state)=>state.Users)

    
    return(<div 
    className="VerifyPage">
    <div >
        <h1>Welcome to Luxury transport</h1>
    
       { notification && notification.msg ==="ok" ? 
      <>
      <div>Congrats,<span >  {userDetail.account.username}</span> you account have been verify!!</div>
    
      </>
       :
       <div>{ notification && notification.msg==="email used already!!" || notification.msg==="username taken!!"?
       <p>oops !! account already verified</p>  :
       <> <p>please click on <span style={{fontFamily:"Tapestry",color:"blue"}}>Verify me</span> to complete process</p>
       <Button style={{width:"100%"}}
onClick={()=>{
    
          if(notification && !notification.success){
              dispatch(CreateUser({t:token}))
  
              
          }
     
}}>Verify me</Button></>}
              
       </div>
       }
       
    </div>
    </div>)

    }

export default VerifyPage