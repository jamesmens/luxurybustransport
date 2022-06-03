const { config } = require("dotenv")
const express=require("express")
const Routers=express.Router()
const {route}=require("express/lib/application")
const {Bookings} =require("../models/Bookings")


const {sortArticles}=require('../middleware/utils')


///// book a ticket
Routers.route("/ticket")
.post( async(req,res)=>{
    try {
        const ticket=new Bookings({
            ...req.body
        })
        const save=await ticket.save()
        res.status(200).json(save)
    } catch (error) {
        res.status(401).json({msg:error})
        
    }
})


/////get a bookings
Routers.route("/getbookings")
.post( async(req,res)=>{
    try {
     
    
        let sortArgs=sortArticles(req.body)
        const bookings=await Bookings.find({})
         .sort([[sortArgs.sortBy,sortArgs.order]])
         .skip(sortArgs.skip)
          .limit(sortArgs.limit)

       
            res.status(200).json(bookings)
     
    
     
    } catch (error) {
        res.status(401).json({msg:error})
        
    }
})



////////////////no pagination
Routers.route("/bookings")
.post( async(req,res)=>{
    try {
      const ticket=await Bookings.find({}).sort({createdAt:"desc"})
   
    
          res.status(200).json(ticket)
     
    } catch (error) {
        res.status(401).json({msg:error})
        
    }
})





module.exports=Routers
