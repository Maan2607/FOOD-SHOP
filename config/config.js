const mongoose = require("mongoose")
require("colors")

// connect database function

const connectDb = async() =>{
    try {
        const conn = await mongoose.connect(process.env.Mongo_URI) ;
        console.log(`Mongodb connected ${conn.connection.host}`) ;
    } catch (error) {
        console.log(`Error : ${error.message}`) 
        process.exit ;
    }
}

module.exports = connectDb 