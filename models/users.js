const express=require("express")
const bcryt=require("bcrypt")
const mongoose=require("mongoose")
const aggregatePaginate =require("mongoose-aggregate-paginate-v2")
const jwt=require("jsonwebtoken")
require("dotenv").config();

const user_Schemas=mongoose.Schema({
firstname:{
    type:String,
    min:4,max:15
},
lastname:{
    type:String,
    min:4,max:15
},
username:{
    type:String,
  
},
email:{
    type:String,
  
},
password:{
    type:String
},
role:{
    type:String,
    default:"user"

},
phone: {
    type: Number,
    length:8,
    required: true
}
, photo: {
    type: String,
    default:"string"
},
address:{
    type:String,
    max:20
},
age:{
    type:Number
},
active:{
    type:String,
    default:true
}



},{timestamps:true})





/////////////////////// admin
const Admin_schm=mongoose.Schema({
    firstname:{
        type:String,
        min:4,max:15
    },
    lastname:{
        type:String,
        min:4,max:15
    },
   
    email:{
        type:String,
      
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
  
    photo: {
        type: String,
       
     default:"string"
     
    },
  role:{
      type:String,
      default:"admin"

  },
    
    verified:{
        type:Boolean,
        default:false
    },
    Creator:{
        type:String,
        default:"no"
    }
    
    },{timestamps:true})
    
    
    
    
    
    
    


 //drivers schema*******************************************************************************************
const driver_schema=mongoose.Schema({
    firstname:{
        type:String,
        trim:true,
        min:3,
        max:20 
    },
    photo:{
type:String,
default:"string"
    },
    approve:{
        type:String,
    
        default:"no"
    
    },
    username:{
        type:String
    }
    ,
    lastname:{
        type:String,
        trim:true, 
        min:3,
        max:20 
    },
    email:{
        type:String,
    
    },
    bus:[{type:mongoose.Schema.Types.ObjectId,ref:"bus"}],
    password:{
        type:String,
        trim:true,
    
    },
    status:{
        type:String,
        default:"pending"
    },
    age:{
        type:Number
    },
    address:{
        type:String
    },
    about_me:{
        type:String

    },
    role:{
        type:String,
        default:"driver"
  
    },
    active:{
        type:String,
        default:true
    },

   verified:{
       type:Boolean,
       default:false
   },
    },{ timestamps: true})




user_Schemas.pre("save",async function(next){
    const user=this;
    if(user.isModified("password")){
        const salt=await  bcryt.genSalt(10)
        const hash=await bcryt.hash(user.password,salt)
        user.password=hash;
    }
    next()
}  )
//// all methodsss***********************************************************************

user_Schemas.methods.comparepassword= async function(inputpassword){
    const user=this;
    const match= await bcryt.compare(inputpassword,user.password)
    return match
 }


 driver_schema.pre("save",async function(next){
    const driver=this;
    if(driver.isModified("password")){
        const salt=await  bcryt.genSalt(10)
        const hash=await bcryt.hash(driver.password,salt)
        driver.password=hash;
    }
    next()
}  )
driver_schema.methods.comparepassword= async function(inputpassword){
    const user=this;
    const match= await bcryt.compare(inputpassword,user.password)
    return match
 }
////////////////gmail verify user////////////////
user_Schemas.methods.usergmailverify= function(){
    const user=this;
    const userId={_id:user._id.toHexString()}
    const token= jwt.sign(userId,process.env.DB_SECRET,{expiresIn:"1d"})
return token
}

//////////// generate tokens

 user_Schemas.methods.generate_token= function(){
     const user=this;
     const userId={_id:user._id.toHexString(),email:user.email}
     const token= jwt.sign(userId,process.env.DB_SECRET,{expiresIn:"1d"})
return token
 }


 ////******************* gmail verify **************** */
 driver_schema.methods.gmailtoken_d= function(){
    const user=this;
    const userId={_id:user._id.toHexString()}
    const token= jwt.sign(userId,process.env.DB_SECRET,{expiresIn:"1d"})
return token
}
/////////////////////////// token///////////////////////////////
 driver_schema.methods.generate_token= function(){
    const user=this;
    const userId={_id:user._id.toHexString(),email:user.email}
    const token= jwt.sign(userId,process.env.DB_SECRET,{expiresIn:"1d"})
return token
}
///////////////////////////////////////////////admin
Admin_schm.pre("save",async function(next){
    const user=this;
    if(user.isModified("password")){
        const salt=await  bcryt.genSalt(10)
        const hash=await bcryt.hash(user.password,salt)
        user.password=hash;
    }
    next()
}  )
//// all methodsss***********************************************************************

Admin_schm.methods.comparepassword= async function(inputpassword){
    const user=this;
    const match= await bcryt.compare(inputpassword,user.password)
    return match
 }

Admin_schm.methods.generate_token= function(){
    const user=this;
    const userId={_id:user._id.toHexString(),email:user.email}
    const token= jwt.sign(userId,process.env.DB_SECRET,{expiresIn:"1d"})
return token
}
Admin_schm.methods.mailverify= function(){
    const user=this;
    const userId={_id:user._id.toHexString()}
    const token= jwt.sign(userId,process.env.DB_SECRET,{expiresIn:"1d"})
return token
}
/////////////////////////////////

const Admin=mongoose.model("Admin",Admin_schm)
const User=mongoose.model("user",user_Schemas)
const Driver=mongoose.model("driver",driver_schema)


module.exports={
    User,Driver,Admin
}