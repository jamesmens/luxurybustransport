
const express=require("express")
const nodemailer = require("nodemailer");
const Routers=express.Router()
const {Comments}=require("../models/Comments")
const {Contactmail}=require("../config/index")
const Mailgen=require("mailgen")
require("dotenv").config()

Routers.route("/newcomment")
.post( async (req,res)=>{
    try {
      await Contactmail(req.body)
        
     const msg= new Comments({ 
             ...req.body

         })
         const result = await msg.save()
       res.status(200).json(result)
      
        
    
    } catch (error) {
        res.status(402).json({msg:"eror"})
        
        
    }
})


////// GET COMMENTS

Routers.route("/getmsg")
.post(async (req,res)=>{
   try {
    const all_msg=await Comments.find({})
    if(all_msg){
        res.status(200).json(all_msg)
    }
    if(!all_msg){
        res.status(400).json({msg:"no commnents found"})
    }
   } catch (error) {
       res.status(402).json({msg:error})
   }
})
module.exports=Routers