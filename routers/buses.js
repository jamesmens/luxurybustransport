const express=require("express")
const {BUS,Seats}=require("../models/bus")
const { route } = require("express/lib/application");
const bus = require("../models/bus");
require("dotenv").config()
const { Driver } = require("../models/users");
const {sortArticles}=require('../middleware/utils')
const {Upload}=require('../middleware/files')
const formidableMiddleware = require('express-formidable');
let routers=express.Router();
const {Contactmail}=require("../config/index")

const {User} =require("../models/users");
const { Components } = require("../models/components");
const cloudinary=require("cloudinary").v2
cloudinary.config({ 
    cloud_name: process.env.ClOUDINARY_NAME, 
    api_key:  process.env.ClOUDINARY_API_KEY, 
    api_secret: process.env.ClOUDINARY_API_SECRETE,
    secure: true,


  });




// //////////////////////////get buses
routers.route("/getbuses").post(  async  (req,res)=>{
  try {
      
    let sortArgs=sortArticles(req.body)
    const buses=await BUS.find({}).populate("driver")
     .sort([[sortArgs.sortBy,sortArgs.order]])
     .skip(sortArgs.skip)
      .limit(sortArgs.limit)

   
     res.status(200).json(buses)
  } catch (error) {
      res.status(400).json({msg:"error"})

  }
})
////////// get buses  no paginations
routers.route("/getallbuses").get( async (req,res)=>{
    try {
        const result=await BUS.find({}).populate("driver")
       
        if(!result){
            res.status(400).res.json({msg:"no bus available"})
        }
        res.json(result)
    } catch (error) {
        res.status(400).json({msg:"error"})
  
    }
  })

/// add seats
routers.route("/createseat")
.post(async (req,res)=>{
    try {
        const seat= await Seats.find({})
        const newseat=new Seats({
            ...req.body,no:(seat.length+1)
        })
    const result=await newseat.save()
    res.status(200).json(result)

    } catch (error) {

    }
})
/// get seats
routers.route("/get_seat")
.get( async(req,res)=>{
    try {
        const seats= await Seats.find({}).sort({no:-1})
        if(seats){
            res.status(200).json(seats)
        }
        if(!seats){
            res.status(400).json({msg:"no seat created"})
        }
    } catch (error) {
        res.status(400).json({msg:error})        
    }
})
////remove seats
routers.route('/removeseat/:id')
.delete(async(req,res)=>{
    try{
        const _id=req.params.id
        const seat=await Seats.findByIdAndDelete(_id)
        res.status(200).json(seat)

    }
    catch(error){
        res.status(400).json({msg:error})
    }
})


/// create buses
/////Add bus image

routers.route("/upload/:id")

.patch(formidableMiddleware(), async(req,res)=>{
try {
    const _id=req.params.id
    const uploads=cloudinary.uploader.upload(req.files.file.path,{
      public_id:`${Date.now()}` ,
      folder:"images" ,
      responsive_breakpoints:{
          create_derived:true,
          min_width:200,
          max_with:700,
          aspect_ration:1,
          crop:"thumb",
          gravity:"face"

      } 
    
    })

const Url = (await uploads).url
const update=await BUS.findByIdAndUpdate({_id},{
    "$set":{
        image:Url
    }
},{new:true})
res.status(200).json(update)


} catch (error) {
    
    
}
}   
 )


 ////////////////////// remove bus
 ////remove seats
routers.route('/removebus/:id')
.delete(async(req,res)=>{
    try{
        const _id=req.params.id
        const bus=await BUS.findByIdAndDelete(_id)
        res.status(200).json({msg:`bus ${bus.busNumber} is removed`})

    }
    catch(error){
        res.status(400).json({msg:"bus not found"})

    }
})

 /////////////////////////////// component creation 
 routers.route("/createcomponent")
.post(async (req,res)=>{
    try {
        
        const parts=new Components ({
            ...req.body
        })
    const result=await parts.save()
    res.status(200).json(result)

    } catch (error) {
        res.status(400).json({msg:`${req.body.type}  component is not allowed`})

    }
})

////////////////////// delete components
routers.route('/deletecomponent/:id')
.delete(async(req,res)=>{
    try{
        const _id=req.params.id
        const part=await Components.findByIdAndDelete(_id)
        res.status(200).json({msg:`${part.type} is deleted`})

    }
    catch(error){
        res.status(400).json({msg:"failed to delete component"})
    }
})
/// modify component
routers.route("/modifycomponent/:id")
.patch(  async(req,res)=>{
    try {
       
        const _id=req.params.id;
 const modify=await Components.findOneAndUpdate({_id},
    { 
       ...req.body,
        "$set": {
            ...req.body
        } 
      }
      
      ,{new:true})
 res.status(200).json(modify)

    } catch (error) {
        res.status(400).json({msg:error})
    }
})
//////////////// get components
routers.route("/get_component")
.get( async(req,res)=>{
    try {
        const parts= await Components.find({})
        if (parts){
            res.status(200).json(parts)
        }
           
       
        if(!parts){
            res.status(400).json({msg:"no component created"})
        }
    } catch (error) {
        res.status(400).json({msg:error})        
    }
})
///////////////////////////////components images

routers.route("/uploadcomponent/:id")

.patch(formidableMiddleware(), async(req,res)=>{
try {
    const _id=req.params.id
    const uploads=cloudinary.uploader.upload(req.files.file.path,{
      public_id:`${Date.now()}` ,
      folder:"Components" ,
      responsive_breakpoints:{
          create_derived:true,
          min_width:200,
          max_with:700,
          aspect_ration:1,
          crop:"thumb",
          gravity:"face"

      } 
    
    })

const Url = (await uploads).url

const update=await Components.findByIdAndUpdate({_id},{
    "$set":{
        photo:Url
    }
},{new:true})
res.status(200).json(update)



} catch (error) {
    res.status(400).json({msg:"error !!"})
    
}
}   
 )
////////////////////////////////////////

 //////////////// user image
 routers.route("/userimg/:id")

.patch(formidableMiddleware(), async(req,res)=>{
try {
    const _id=req.params.id
    const uploads=cloudinary.uploader.upload(req.files.file.path,{
      public_id:`${Date.now()}` ,
      folder:"USER_IMAGES" ,
      responsive_breakpoints:{
          create_derived:true,
          min_width:200,
          max_with:700,
          aspect_ration:1,
          crop:"thumb",
          gravity:"face"

      } 
    
    })

const Url = (await uploads).url
const update=await User.findByIdAndUpdate({_id},{
    "$set":{
        photo:Url
    }
},{new:true})
res.status(200).json(update)


} catch (error) {
    
    
}
}   
 )
 //////////////// Driver image
 routers.route("/driverimg/:id")

.patch(formidableMiddleware(), async(req,res)=>{
try {
    const _id=req.params.id
    const uploads=cloudinary.uploader.upload(req.files.file.path,{
      public_id:`${Date.now()}` ,
      folder:"DRIVER_IMAGES" ,
      responsive_breakpoints:{
          create_derived:true,
          min_width:200,
          max_with:700,
          aspect_ration:1,
          crop:"thumb",
          gravity:"face"

      } 
    
    })

const Url = (await uploads).url
const update=await Driver.findByIdAndUpdate({_id},{
    "$set":{
        photo:Url
    }
},{new:true})
res.status(200).json(update)


} catch (error) {
    
    
}
}   
 )
////////////
routers.route("/createbus")
.post( async(req,res)=>{
try {
    

    const n_seat= await Seats.find({}).sort({no:-1})
    const drivers=await Driver.find({"username":req.body.driver}).populate("bus")

   
         let new_bus=new BUS({

   ...req.body, seats_no: n_seat, driver:drivers,
   image:"string"
  
          
            })
            const result=await new_bus.save()
    res.status(200).json(result)
const driverp=await Driver.findOneAndUpdate({"username":req.body.driver},{$set:{
    bus:result,
    status:"active"
}},{new:true})
  
     await Contactmail(driverp.email,`${driverp.firstname}  ${driverp.lastname} you been allocated to bus number ${result.busNumber} belonging to ${result.company}`)
       

} catch (error) {
   
    
}
}   
 )
 

 
       
    
 




//// get bus details
routers.route("/bus_details/:id")
.get( async (req,res)=>{
    try {
        const _id=req.params.id
        const bus= await BUS.findOne({_id}).populate("driver")
       
        if(bus){
            res.status(200).json(bus)
        }
        if(!bus){
            res.status(400).json({msg:"requires bus not found"})
        }

    } catch (error) {
    res.status(400).json({msg:"errrosss"})
        
    }
})






///set bus seats to default

routers.route("/resetseats/:id")
.patch( async (req,res)=>{

    try {
        const _id=req.params.id
        const modify= await BUS.findOneAndUpdate({_id},{$set:{
            ...req.body, 
          "seats_no.$[].status":"free"
        }},
            {new:true})

res.status(200).json(modify)
    } catch (error) {
        res.status(400).send(error)

    }
})

///// modify seats
routers.route("/seatbook/:id/:d")
.patch(  async(req,res)=>{
    try {
        const d=req.params.d
        const _id=req.params.id;
 const modify=await BUS.findOneAndUpdate({_id,"seats_no.no":parseInt(d)},
    { 
       ...req.body,
        "$set": {"seats_no.$.status":"booked"} 
      }
      
      ,{new:true})
 res.status(200).json(modify)

    } catch (error) {
        res.status(400).json({msg:error})
    }
})
///// modify seats
routers.route("/seatselect/:id/:d")
.patch(  async(req,res)=>{
    try {
        const d=req.params.d
        const _id=req.params.id;
 const modify=await BUS.findOneAndUpdate({_id,"seats_no.no":parseInt(d)},
    { 
       ...req.body,
        "$set": {"seats_no.$.status":"selected"} 
      }
      
      ,{new:true})
 res.status(200).json(modify)

    } catch (error) {
        res.status(400).json({msg:error})
    }
})

routers.route("/freeseat/:id/:d")
.patch(  async(req,res)=>{
    try {
        const d=req.params.d
        const _id=req.params.id;
 const modify=await BUS.findOneAndUpdate({_id,"seats_no.no":parseInt(d)},
    { 
       ...req.body,
        "$set": {"seats_no.$.status":"free"} 
      }
      
      ,{new:true})
 res.status(200).json(modify)

    } catch (error) {
        res.status(400).json({msg:error})
    }
})

//// admin modify bus
routers.route("/adminmodifybus/:id")

.patch( async (req,res)=>{
    try {
        const _id=req.params.id
        const bus= await BUS.findByIdAndUpdate({_id},{
            $set:{
                ...req.body,
                driver: await Driver.find({"username":req.body.driver}),
            
             
            }
            
        },{new:true})
        res.status(200).json(bus)
        const driverp=await  Driver.findOneAndUpdate({"username":req.body.driver},{$set:{
            bus:await BUS.findByIdAndUpdate({_id}),
            status:"active"
        }},{new:true})
          
             await Contactmail(driverp.email,`${driverp.firstname}  ${driverp.lastname} you been allocated to bus number ${result.busNumber} belonging to ${result.company}`)

    } catch (error) {
        
    }
   
})

//// active bus
routers.route("/unactivebus/:id")

.patch( async (req,res)=>{
    try {
        const _id=req.params.id
        const bus= await BUS.findByIdAndUpdate({_id},{
            $set:{
                ...req.body,
                ava:false
            
             
            }
            
        },{new:true})
        res.status(200).json(bus)
 

    } catch (error) {
        
    }
   
})
//// active bus
routers.route("/activebus/:id")

.patch( async (req,res)=>{
    try {
        const _id=req.params.id
        const bus= await BUS.findByIdAndUpdate({_id},{
            $set:{
                ...req.body,
                ava:true
            
             
            }
            
        },{new:true})
        res.status(200).json(bus)
 

    } catch (error) {
        
    }
   
})

module.exports=routers



