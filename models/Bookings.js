const { default: mongoose } = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Booking_Schema=new mongoose.Schema({
    firstname:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    lastname:{
        type:String
    }
,

    photo:{
        type:String,
        default:"string"
    },
    fare:{
        type:Number
    },
    lastname:{
        type:String,
        
    },
    busNumber:{
        type:String,
       
    },
    seatnumber:{type:String,
       
    },
    departure:{
        type:String
    },
    startpoint:{
        type:String
    },
    destination:{
        type:String,
        
    }
},{ timestamps: true})
Booking_Schema.plugin(aggregatePaginate);
const Bookings=mongoose.model("Bookings",Booking_Schema)
module.exports=({
    Bookings

})