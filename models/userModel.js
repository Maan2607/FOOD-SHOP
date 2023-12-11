const mongoose = require( "mongoose" ) ;
const userschema = mongoose.Schema({
      name:{
        type : String,
        required :true 
      },
      userId:{
        type:String,
        required:true
      },
      password:{
        type:String,
        required:true
      },
      emaill:{
      type:String,
      required:true
      },
      verified:{
        type:Boolean
      }
},{timestamp:true})

const Users  =  mongoose.model("users",userschema) ;

module.exports = Users