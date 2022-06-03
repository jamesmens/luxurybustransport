import axios from "axios"
import * as Bus from "./index"


axios.defaults.headers.post["Content-Type"]="application/json"
export const Get_bus=(sort)=>{
    return async (dispatch,getState)=>{
        try {
            const bus= await axios.post("/bus/getbuses",sort)
            let buses=[...bus.data]
        
            const prev=getState().Bus_collection.Buses
            if(prev){
                 buses=[...prev,...bus.data]
              
            }
            dispatch(Bus.Get_buses(buses))
        } catch (error) {
            console.log(error)            
        }
    }
    

    

}

export const bus_trigger=(sort)=>{
    return async (dispatch,getState)=>{
        try {
            const bus= await axios.post("/bus/getbuses",sort)
           

            dispatch(Bus.Get_buses(bus.data))
        } catch (error) {
                     
        }
    }
    

    

}

export const all_buses=()=>{
    return async (dispatch,getState)=>{
        try {
            const bus= await axios.get("/bus/getallbuses")
            
            dispatch(Bus.main_buses(bus.data))
           
        } catch (error) {
                   
        }
    }

    

}
//// get bus details
export const Get_bus_details=(id)=>{
    return async(dispatch,getState)=>{
        try {
            const bus_detail=await axios.get(`/bus/bus_details/${id}`)
           
            dispatch(Bus.Get_bus_detail(bus_detail.data))
        
              
          } catch (error) {
              
          }

    }
  
}
/// create new bus
export const New_bus=(values)=>{
    return async (dispatch)=>{

        try{
            const NewBus=await axios.post("/bus/createbus",values,)
            dispatch(Bus.New_buses(NewBus.data))
        }
        catch(error){
           

        }
 
      
       
        
    }
}
export const Create_seats=()=>{
    return async (dispatch)=>{
        try{
            const new_seat=await axios.post("/bus/createseat")
            dispatch(Bus.Create_s(new_seat.data))

        }
        catch(error){
            console.log("error in code")

        }
    }
}

export const Activebus=(id)=>{
    return async (dispatch)=>{
        try{
            const delete_bus=await axios.patch(`/bus/activebus/${id}`)
            dispatch(Bus.notify_suc("bus is now active"))

        }
        catch(error){
      

        }
    }
}

export const Unactivebus=(id)=>{
    return async (dispatch)=>{
        try{
            const delete_bus=await axios.patch(`/bus/unactivebus/${id}`)


            dispatch(Bus.notify_suc("bus unactive trigged"))

        }
        catch(error){
            console.log("error in code")

        }
    }
}


export const Delete_bus=(id)=>{
    return async (dispatch)=>{
        try{
            const delete_bus=await axios.delete(`/bus/removebus/${id}`)


            dispatch(Bus.notify_suc("bus removed!! "))

        }
        catch(error){
           

        }
    }
}
export const Reset_seat=(id)=>{
    return async (dispatch)=>{
        try{
            const delete_bus=await axios.patch(`/bus/resetseats/${id}`)


            dispatch(Bus.notify_suc("Bus seats set to default!!"))

        }
        catch(error){
            console.log("error in code")

        }
    }
}



export const Upload_img=(id,file)=>{
return async (dispatch)=>{
try{
const update =await axios.patch(`/bus/upload/${id}`,file)
Bus.notify_suc("Good, image uploaded")
}
catch(error){
    Bus.notify_error(error.response.data.msg)

}
}
}


export const Remove_seat=(value)=>
{
    return async(dispatch)=>{
        try{
            const seat=await axios.delete(`/bus/removeseat/${value}`)
          

        }catch(error){
         

        }
    }
}
export const Get_Seats=()=>{
    return async (dispatch)=>{
        try{
            const Seats=await axios.get("/bus/get_seat")
            dispatch(Bus.Get_s(Seats.data))

        }catch(error){
            console.log("erroed")
        }
       

    }
}
export const Update_bus=(id,value)=>{
    return async(dispatch)=>{
        try{
const result=await axios.patch(`/bus/adminmodifybus/${id}`, value)

Bus.notify_suc("Good, Bus updated")

        }
        catch(error){
            Bus.notify_error(error.response.data.msg)
         

        }
    }
}

export const Selectseat=(id,d)=>{
    return async(dispatch)=>{
        try{
const result=await axios.patch(`/bus/seatselect/${id}/${d}`)

Bus.notify_suc("seat selected")
        }
        catch(error){
            Bus.notify_error(error.response.data.msg)
            console.log("could not update")

        }
    }
}
export const Free_Seat=(id,d)=>{
    return async(dispatch)=>{
        try{
const result=await axios.patch(`/bus/freeseat/${id}/${d}`)


        }
        catch(error){
            Bus.notify_error(error.response.data.msg)
            

        }
    }
}

export const BookSeat=(id,d)=>{
    return async(dispatch)=>{
        try{
const result=await axios.patch(`/bus/seatbook/${id}/${d}`)


        }
        catch(error){
            Bus.notify_error(error.response.data.msg)
            

        }
    }
}



