const mongoose=require("mongoose")
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const component=mongoose.Schema({

    photo:{
type:String,
default:"string"
    },
    type:{
        type:String,
        enum:["Searchbar","Footer","About Us","Location","Title","Sponsor"]
    },
    content:{
        type:String
    }
}, { timestamps: true})


const Components=mongoose.model("component",component)

module.exports={Components}