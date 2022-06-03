const express=require("express")
const mogoose=require("mongoose")
const app=express()
require("dotenv").config()
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const PORT=process.env.PORT ||3003
const path=require("path")

const {BUS, Seats}= require("./models/bus")





const MongoUrl=`mongodb+srv://jamescoded:${process.env.DB_PASS}@cluster0.b4lxx.mongodb.net/Bus_System?retryWrites=true&w=majority`



const Admin=require("./routers/Admin")
const buses=require("./routers/buses")
const msg=require("./routers/Comments")
const users=require("./routers/users")
const booking=require("./routers/Bookings")
const {checkToken}=require("./middleware/auth")

app.use(bodyParser.json())

app.use(cookieParser())
app.use(checkToken)
/// middlewares
app.use("/admin",Admin)
app.use("/bus",buses)
app.use("/user",users)
app.use("/comments",msg)
app.use("/booking",booking)






mogoose.connect(MongoUrl,(er,res)=>{
    if(er){
        console.log("not connected")
    }
    if(res){
console.log("mogodb connected")
    }
})
app.listen(PORT,(er,res)=>{
    if(er){
        console.log("express not connected")
    }
    
        console.log(`express server running on ${PORT} `)
    
})

app.use(express.static("client/build"));

if(process.env.NODE_ENV==="production"){
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));

    });

}