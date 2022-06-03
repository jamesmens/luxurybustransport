const express=require("express")
require("dotenv").config();
const jwt=require("jsonwebtoken")

const {User,Driver}=require("../models/users")
const {Admin}=require("../models/users")
exports.checkToken=async (req,res,next)=>{
  try {
      if(req.headers["x-auth"]){
        const {_id,expiresIn}=jwt.verify(req.headers["x-auth"],process.env.DB_SECRET);
        
         const account=await User.findById({"_id":_id})

           const admin=await Admin.find({"_id":_id})
           const driver=await Driver.findById({"_id":_id}).populate("bus")
           if(driver){
            res.locals.userData=driver
           }
         
          if(!driver && account){
            res.locals.userData=await User.findById({"_id":_id})
           
            
           }
           
             if(!account && !driver){
              res.locals.userData=await Admin.findById({"_id":_id});

             }
           
         
         
        
     
        next();
  
      }
      else{
          next()
      }
  
  
      
  } catch (error) {
      res.status(401).send({error:"bad token"})
      
  }
  }
  
exports.Checkuser= async(req,res,next)=>{
  const user=res.locals.userData;
 
  req.user=user
  next();
}
  