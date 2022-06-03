const { type } = require("express/lib/response")

const mongoose=require("mongoose")
// seats schema *********************************************************************************
const Seat=new mongoose.Schema({
 no:{
     type:Number,
     default:1
 },

 status:{
     type:String,
     enum:["free", "selected","booked"],
     default:"free"
    

 }
})









//bus schema ************************************************************************************
const bus_schema=new mongoose.Schema({
  company:{
    type:String
  },
    seats_no:{
        type:Array
    },
image:{
 type:String
},
ava:{
  type:String,
  default:true
},
    name:{
        type:String,
        require:true,
        default:"Mini bus"
    },
  
    type: {
        type: String,
        enum: ["AC", "Delux", "Normal", "Suspense AC", "Suspense Delux"]
      },
      busNumber: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        default:"GHA-34"
      },
      fare: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32,
        default:234,
      },
      seatsAvailable: {
        type: Number,
        trim: true,
        default: 30,
        maxlength: 32
      },
      bookedSeat: {
        type: []
      },
      soldSeat: {
        type: []
      },
      boardingPoints: [
        {
          type: String,
          trim: true
        }
      ],
      droppingPoints: [
        {
          type: String,
          trim: true
        }
      ],
    driver:[{
      type:mongoose.Schema.Types.ObjectId,ref:"driver"
    }],
    work_days:{
        type:[Date]
    },
    startpoint:{
      type:String,
      default:"kkkkkkkkkkkkkkkk"
    },
    destination:{
      type:String
    }
    
  
      

}
, { timestamps: true})




const BUS=mongoose.model("bus",bus_schema)
const Seats=mongoose.model("seats",Seat)


module.exports=({
    BUS,Seats
})