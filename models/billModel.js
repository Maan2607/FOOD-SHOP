const mongoose = require("mongoose") ;
const billschema = mongoose.Schema({
    customerName:{
        type : String,
        required :true 
    },
    cutomerContact:{
        type:Number,
        required : true 
    },
    TotalAmount:{
        type: Number,
        required: true
    },
    subTotal:{
        type: Number,
        required: true
    },
    tax:{
        type: Number,
        required: true 
    },
    paymentMode:{
        type: String,
        required: true 
    },
    cartItems:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
},{timestamp:true})

const bills  =  mongoose.model("bills",billschema) ;

module.exports = bills