const express=require("express")
const {route}=require("express/lib/application")
const { Checkuser } = require("../middleware/auth")
const { BUS } = require("../models/bus")
const {} =require("../models/users")
require("dotenv").config()
const routers=express.Router()
const {Driver,User} =require("../models/users")
const {Aggregate} =require("mongoose")
const {sortArticles} =require("../middleware/utils")
const {Registermail}=require("../config/index")
const {Contactmail,Resetpass,Refundticket,RegisterDriver}=require("../config/index")
const jwt=require("jsonwebtoken")
const {Admin}=require("../models/users")
const bcryt=require("bcrypt")
/////////////////////////////////////////////// create new user


routers.route("/preregister")
.post( async(req,res)=>{
    try{

        const {firstname,lastname,email,age,password,address,username,phone}=req.body
        const check_user= await User.findOne({"email":email})
const check_username=await User.findOne({"username":username})
const check_driver= await Driver.findOne({"email":email})

if(check_username || check_user || check_driver){
    if(check_username && check_user){
        res.status(400).json({

            msg:"Email and Username taken!!"
        })
    }
    if(check_user && !check_username){
        res.status(400).json({

            msg:"email used already!!"
        })
    }
    if(check_driver){
        res.status(400).json({

            msg:"email taken!!"
        })
    }
    if(check_username && !check_user){
        res.status(400).json({

            msg:"username taken!!"
        })
    }
  

   
}

else if(!check_user && !check_username ) {
 const signtoken=jwt.sign({firstname,lastname,email,age,password,address,username,phone},process.env.ACCOUNT_ACTIVATION,{expiresIn:"1d"})
 await Registermail(email,signtoken)
 res.status(200).json("ok")
 }


    }catch(error){
        res.status(400).json({msg:error})
        

    }
})

routers.route("/createuser")
.post( async (req,res)=>{
    try {
        const {firstname,lastname,email,age,password,address,username,phone}=jwt.verify(req.body.t,process.env.ACCOUNT_ACTIVATION)

     
const check_user= await User.findOne({"email":email})
const check_username=await User.findOne({"username":username})

 if(check_username || check_user){
     if(check_user){
         res.status(400).json({

            msg:"email used already!!"
        })
    }
    else{
        res.status(400).json({

           msg:"username taken!!"
         })
     }
   
}

 else if(!check_user && !check_username) {
      const user=new User ({
        firstname:firstname,
        lastname:lastname,
        email:email,
        age :age,
        password:password,
        address:address,
        username:username,
        phone: phone
  
     
 })

  const save_user= await user.save()

 const token=user.generate_token()

  res.cookie("x-auth",token). json(save_user)


 }
  
        
    } catch (error) {
       res.status(400).json({msg:error}) 
    }
})
//////////////////////////////////////// get users 
routers.route("/alluser")
.post( async(req,res)=>{
    try {
       

        const allusers=await User.find({}).sort({"createdAt":"desc"})
        

        if(!allusers){
            res.status(400).json({msg:"no user found"})
        }
        if(allusers){
            res.status(200).json(allusers)
        }
    } catch (error) {BVJN,M
        res.status(400).json({msg:error})
        
    }
})
////////////GET USER//////////////////paginate
routers.route("/getallusers")
.post( async(req,res,next)=>{
    
    try {

        let sortArgs=sortArticles(req.body)
        const all_user=await User.find({})
         .sort([[sortArgs.sortBy,sortArgs.order]])
         .skip(sortArgs.skip)
          .limit(sortArgs.limit)

       
            res.status(200).json(all_user)
            next()
        
    } catch (error) {
     res.status(400).json({msg:error})   
    }
})

////////////////////////////////////////////// signin users
routers.route("/signin")
.post( async (req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const user_ac=await User.findOne({"email":email})
        const driver_ac=await Driver.findOne({"email":email}).populate("bus")
        const admin=await Admin.findOne({"email":email})

        
        if(!user_ac && !driver_ac && !admin){
            res.status(400).json({msg:"user not found"})
        }
        if(user_ac){
            if(user_ac.active==="false"){
                res.status(400).json({msg:"user blocked"})
            }
            if(user_ac.active ==="true"){
                const matchpassword=await user_ac.comparepassword(password)
                if(matchpassword==true){
                    const token=user_ac.generate_token()
                    res.cookie("x-auth",token).json(user_ac)
    
                
                }
                if(matchpassword ==false){
                    res.status(400).json({msg:"password mismatch"})
                }
    

            }
           
           
        }
         if(driver_ac){
            const matchpassword=await driver_ac.comparepassword(password)
            if(matchpassword==true){
               const token=driver_ac.generate_token()
                 res.cookie("x-auth",token).json(driver_ac)

            
            }
            if(matchpassword ==false){
               res.status(400).json({msg:"password mismatch"})
           }

           
        }
         if(admin){
             const matchpassword=await admin.comparepassword(password)
             if(matchpassword==true){
                 const token=admin.generate_token()
                 res.cookie("x-auth",token).json(admin)

            
            }
            if(matchpassword ==false){
                res.status(400).json({msg:"password mismatch"})
            }

           
         }
    } catch (error) {
        res.status(400).json("error")
        
    }
})

//////////////////////////////////////////////// modify user content
routers.route("/modifyuser/:id")
.patch( async (req,res)=>{
    try {
        const _id=req.params.id

        const updated_user= await User.findOneAndUpdate({_id},{
            $set:{
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                phone:req.body.phone,
                age:req.body.age,
               
                address:req.body.address
            }
        },{new:true})
        res.status(200).json(updated_user)
        
    
    } catch (error) {
        res.status(400).json({msg:"error"})
        
    }
})

///////////////// modify driver profile


/////////////////////////////////////////////// delete user account

/////////////////////  suspend user
routers.route("/suspenduser/:id")
.patch( async (req,res)=>{
    try {
        const _id=req.params.id;
        const user=await User.findOne({_id})
        if(!user){
            res.status(400).json({msg:"user not found"})
        }
        if(user){
             const userdata=await User.findByIdAndUpdate({_id},{$set:{
                ...req.body,
                active:false
            }},{new:true})
            res.status(200).json({msg:`${user.username}`})
           
            await Contactmail(user.email,"you violated our terms and condition.you can contact our adminstrator to recover your account")
        }
       
    } catch (error) {
        res.status(400).json({msg:error})
    }
})

/////////////////////  unblock user
routers.route("/unblockuser/:id")
.patch( async (req,res)=>{
    try {
        const _id=req.params.id;
        const user=await User.findOne({_id})
        if(!user){
            res.status(400).json({msg:"user not found"})
        }
        if(user){
             const userdata=await User.findByIdAndUpdate({_id},{$set:{
                ...req.body,
                active:true
            }},{new:true})
            res.status(200).json({msg:`${userdata.username}`})
         
            await Contactmail(user.email,` hi, ${user.username} your account has been recovered`)
        }
    
    } catch (error) {
        res.status(400).json({msg:error})
    }
})

////////////////// suspend driver
routers.route("/suspenddriver/:id")
.patch( async (req,res)=>{
    try {
        const _id=req.params.id;
        const user=await Driver.findOne({_id})
        if(!user){
            res.status(400).json({msg:"user not found"})
        }
        if(user){
             const userdata=await Driver.findByIdAndUpdate({_id},{$set:{
                ...req.body,
                active:false
            }},{new:true})
            res.status(200).json({msg:`${user.username} suspended`})
            
            await Contactmail(user.email,"sorry, you violated our terms and condition.you can contact our adminstrator to recover your account")
        }
       
    } catch (error) {
        res.status(400).json({msg:error})
    }
})

/////////////////////  unblock driver
routers.route("/unblockdriver/:id")
.patch( async (req,res)=>{
    try {
        const _id=req.params.id;
        const user=await Driver.findOne({_id})
        if(!user){
            res.status(400).json({msg:"user not found"})
        }
        if(user){
             const userdata=await Driver.findByIdAndUpdate({_id},{$set:{
                ...req.body,
                active:true
            }},{new:true})
            res.status(200).json({msg:`${userdata.username} unblocked`})
         
            await Contactmail(user.email,` hi, ${user.username} your account has been recovered`)
        }
    
    } catch (error) {
        res.status(400).json({msg:error})
    }
})



////////////////// profile
routers.route("/profile")
.get(Checkuser,async (req,res)=>{
   try {
      
  const user= await User.findById(req.user._id)
  if(user){
    res.status(200).json(user)
  }
  if(!user){
      const driver=await Driver.findById(req.user._id).populate("bus")
      if(driver){
        res.status(200).json(driver)
      }
      const admin=await Admin.findById(req.user._id)
      if(admin){
        res.status(200).json(req.user)


      }
     
  }
        
    } 
  

    catch (error) {
       res.send(error)
       
   }})

    



//////////////////////////////////////////////////// create driver account





/////////////////////

routers.route("/driverapply")
.post( async(req,res)=>{
    try{

        const {firstname,lastname,email,age,password,address,username,phone,about_me}=req.body
        const check_user= await Driver.findOne({"email":email})
const check_username=await Driver.findOne({"username":username})
const user_email=await User.findOne({"username":username})
if(check_username || check_user || user_email ){
    if(check_user){
        res.status(400).json({

            msg:"email used already!!"
        })
    }
    if(check_username){
        res.status(400).json({

            msg:"username taken!!"
        })
    }
    if(user_email){
        res.status(400).json({

            msg:"username taken!!"
        })

    }
   
}

else if(!check_user && !check_username  && !user_email) {
 const signtoken=jwt.sign({firstname,lastname,email,age,password,address,username,phone,about_me},process.env.ACCOUNT_ACTIVATION,{expiresIn:"1d"})
 await RegisterDriver(email,signtoken)
 res.status(200).json("form")
 }


    }catch(error){
        res.status(400).json({msg:error})
       

    }
})
////////////////////////////  CREATE DRIVER ACCOUNT 
routers.route("/createdriver")
.post( async (req,res)=>{
    try {
        const {firstname,lastname,email,age,password,address,username,phone,about_me}=jwt.verify(req.body.t,process.env.ACCOUNT_ACTIVATION)

     
        const check_user= await Driver.findOne({"email":email})
        const check_username=await Driver.findOne({"username":username})
        const user_email=await User.findOne({"username":username})
        if(check_username || check_user || user_email ){
            if(check_user){
                res.status(400).json({
        
                    msg:"email used already!!"
                })
            }
            if(check_username){
                res.status(400).json({
        
                    msg:"username taken!!"
                })
            }
            if(user_email){
                res.status(400).json({
        
                    msg:"email taken as user!!"
                })
        
            }
           
        }
      
 if(!check_user) {
       const user=new Driver ({
         firstname:firstname,
        lastname:lastname,
          email:email,
         age :age,
          password:password,
          address:address,
        username:username,
        phone: phone,
      about_me:about_me
  
     
  })

 const save_user= await user.save()

 

   res.status(200).json(save_user)

  }
  
        
    } catch (error) {
       res.status(400).json({msg:error}) 
    }
})






















////////////////////////////////////////////////////////// get drivers 
routers.route("/getalldriver")
.post( async(req,res,next)=>{
    
    try {

        let sortArgs=sortArticles(req.body)
        const all_drivers=await Driver.find({}).populate("bus")
         .sort([[sortArgs.sortBy,sortArgs.order]])
         .skip(sortArgs.skip)
          .limit(sortArgs.limit)

       
            res.status(200).json(all_drivers)
            next()
        
    } catch (error) {
     res.status(400).json({msg:error})   
    }
})
//////////////get user
routers.route("/getallu")
.post( async(req,res,next)=>{
    
    try {

        let sortArgs=sortArticles(req.body)
        const all_user=await User.find({})
         .sort([[sortArgs.sortBy,sortArgs.order]])
         .skip(sortArgs.skip)
          .limit(sortArgs.limit)

       
            res.status(200).json(all_user)
            next()
        
    } catch (error) {
     res.status(400).json({msg:error})   
    }
})


///////////// GET DRIVER///////////////////
routers.route("/alldriver")
.get( async(req,res,next)=>{
    try {

        
        const all_drivers=await Driver.find({}).sort({no:-1}).populate("bus")
     
            res.status(200).json(all_drivers)
            next()
        
    } catch (error) {
     res.status(400).json({msg:error})   
    }
})

/// update drivers 

///////////////////////////////////////////////// signin driver account
routers.route("/login")
.post(async (req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const logged_driver=await Driver.findOne({email})
        if(!logged_driver){
            res.status(401).json({msg:"user not found"})
        }
        if(logged_driver){
            const matchpassword=await logged_driver.comparepassword(password)
            if(matchpassword==true){
                const token=logged_driver.generate_token()

                res.cookie("x-auth",token).json(logged_driver)
            
            }
            if(matchpassword ==false){
                res.status(400).json({msg:"password mismatch"})
            }


           
        }
    } catch (error) {
        res.status(400).json({msg:"error"})
        
    }
})////////////////////////////////// delete user



routers.route("/deluser/:id")
.delete( async (req,res)=>{
    try {
        
        const _id=req.params.id
const user=await User.findByIdAndDelete(_id)

if(user){
    await Contactmail(user.email,"sorry, you violated our terms and condition.Your account has been retracted")
}
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({msg:error})

        
    }
})


///////////// send user msg
routers.route("/usermsg/:id")
.delete( async (req,res)=>{
    try {
        
        const _id=req.params.id
const user=await User.findByIdAndDelete(_id)
if(user.verified===true){
    await Contactmail(user.email,req.body.mesage)
}

        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({msg:error})

        
    }
})



//// //////////////////////////////////////
routers.route("/adminmodifydriver/:id")
.patch( async (req,res)=>{
    try {
        const _id=req.params.id

        const updated_driver= await Driver.findOneAndUpdate({_id},{
            $set:{
              
                phone:req.body.phone,
                address:req.body.address,
                
                bus: await BUS.find({"driver":req.body})
            }
        },{new:true})
        res.status(200).json(updated_driver)
        
    
        
    } catch (error) {
        res.status(400).json({
        msg:error
        })
        
    }
})

///////////////////////////////////////////////// modify driver content
routers.route("/modifydriver/:id")
.patch( async (req,res)=>{
    try {
        const _id=req.params.id
        const Drivers=await Driver.find({_id})
         

        const updated_driver= await Driver.findOneAndUpdate({_id},{
            $set:{
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                phone:req.body.phone,
                age:req.body.age,
                address:req.body.address,
               
            }
        },{new:true})
        res.status(200).json(updated_driver)
        
    
        
    } catch (error) {
        res.status(400).json({
        msg:error
        })
        
    }
})


//////////////////// driver update bus


/////////////////////////////////////invite new applicant
routers.route("/approvedriver/:id")
.patch( async (req,res)=>{
    try {
        const _id=req.params.id
     
        await Contactmail(req.body.email,req.body.message)
        const updated_driver= await Driver.findByIdAndUpdate({_id},{
            $set:{
               approve:"yes"
            }
        },{new:true})
       
        res.status(200).json(updated_driver)
        
    
        
    } catch (error) {
        res.status(400).json({
        msg:error
        })
        
    }
})



/////////////////////////////////////////////////// delete driver account
routers.route("/deldriver/:id")
.delete( async (req,res)=>{
    try {
        
        const _id=req.params.id
const driver=await Driver.findByIdAndDelete(_id)
if(driver.approve==="no"){
    await Contactmail(driver.email,"sorry, your application is declined")
}
if(driver.approve==="yes"){
    await Contactmail(driver.email,"sorry, you violated our terms and condition.Your account has been retracted")
}
        res.status(200).json({msg:driver})
    } catch (error) {
        res.status(400).json({msg:error})

        
    }
})

///////////////// gmail verification
/// user reset password

routers.route("/userResetPass/:id")
.patch(async(req,res)=>{
    try{
const _id=req.params.id
const user_a=await User.findById({_id})
if(user_a){
    const matchpassword=await user_a.comparepassword(req.body.password)
    if(matchpassword==false){
        res.status(400).json({msg:"password mismatch"})
    }
    if(matchpassword==true){
        const salt=await  bcryt.genSalt(10)
        const hash=await bcryt.hash(req.body.newpassword,salt)
        const newpass=await User.findOneAndUpdate({_id},{$set:{
            password:hash
        }},{new:true})

    res.status(200).json(newpass)
    }
}

    }
    catch(error){
        res.status(400).json({msg:error})
    }
})
///////////////// driver reset pass

routers.route("/driverResetPass/:id")
.patch(async(req,res)=>{
    try{
const _id=req.params.id
const user_a=await Driver.findById({_id})

if(user_a){
   
    const matchpassword=await user_a.comparepassword(req.body.password)
   
    
    if(matchpassword==false){
        res.status(400).json({msg:"password mismatch"})
    }
    if(matchpassword==true){
        const salt=await  bcryt.genSalt(10)
        const hash=await bcryt.hash(req.body.newpassword,salt)
        const newpass=await Driver.findOneAndUpdate({_id},{$set:{
            password:hash
        }},{new:true})

    res.status(200).json(newpass)
    }
}

    }
    catch(error){
        res.status(400).json({msg:error})
    }
})
////////////
/////// forget password



















//////////


routers.route("/userforgotpass")
.post(async(req,res)=>{
    try{
        const email=req.body.email

const user_a=await User.find({"email":email})
const driver_a=await Driver.find({"email":email})
if(!user_a && !driver_a){
    res.status(400).json({msg:"account not found"})

} if(user_a){
  const signtoken=  jwt.sign({email},process.env.ACCOUNT_ACTIVATION,{expiresIn:"1d"})

     Resetpass(req.body.email,signtoken)
   
  res.status(200).json(signtoken)
   }
   if(driver_a && !user_a){
        const signtoken=jwt.sign({email},process.env.ACCOUNT_ACTIVATION,{expiresIn:"1d"})
        await  Resetpass(req.body.email,signtoken)
      
      res.status(200).json({msg:"ok"})
    }


    }
    catch(error){
        res.status(400).json({msg:"erro"})
    }
})
//// reset page

routers.route("/passwordforgotreset")
.patch(async(req,res)=>{
    try{


const {email}= jwt.verify(req.body.t,process.env.ACCOUNT_ACTIVATION)


 const user=await User.find({email})
 const driver=await Driver.find({email})


 if(user || driver){
     

 if(user[0])
 {
   
  
      const salt=await  bcryt.genSalt(10)
      const hash=await bcryt.hash(req.body.password,salt)
   
 
   const updated= await User.findOneAndUpdate({"email":email},{
    $set:{
       password:hash
   }
},{new:true})
res.status(200).json(user)
 } 

if(driver[0] ){
          const salt=await  bcryt.genSalt(10)
     const hash=await bcryt.hash(req.body.password,salt)
       const newpass=await Driver.findOneAndUpdate({"email":email},{$set:{
           password:hash
       }},{new:true})

    res.status(200).json(newpass)
   } 

 }





}
    catch(error){
res.status(400).json({msg:"error"})
    }
})
//////////////////////////refund
routers.route("/ticketrefund/:id")
.post(async(req,res)=>{
    try{
const _id=req.params.id
const user=await User.findById({_id})
const detail=req.body
if(!user){
    res.status(400).json({msg:"something is went wrong"})
}
if(user){
    await Refundticket(user,detail)
   
  res.status(200).json({msg:"good!, you well hear from Us after review" })
    }


    }
    catch(error){
        res.status(400).json({msg:error})
    }
})




module.exports=routers