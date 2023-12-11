const mongoose = require("mongoose") ;
const itemschema = mongoose.Schema({
    name:{
        type : String,
        required :true 
    },
    price:{
        type:Number,
        required : true 
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true 
    }
},{timestamp:true})

const items  =  mongoose.model("items",itemschema) ;
module.exports = items