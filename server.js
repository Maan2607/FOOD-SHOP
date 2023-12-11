const express = require("express")
const dotenv= require("dotenv")
const morgan = require("morgan") //morgan is widely used for development and debugging purposes as it provides helpful information about requests and responses.
const bodyparser = require("body-parser") //When an HTTP request contains data in its body (e.g., form submissions, JSON payloads), body-parser parses that data and transforms it into a more usable format for further processing. It handles different types of data, such as JSON, URL-encoded, and multipart data.
const cors = require("cors") //In JavaScript, CORS (Cross-Origin Resource Sharing) is a mechanism that allows web applications running in one domain to access resources (such as data, APIs, or assets) from another domain. It is a security feature implemented by browsers to enforce restrictions on cross-origin requests.
require("colors")
const app= express() // rest object - all things of express in app
const connectDb = require("./config/config")
// middlewares
app.use(cors()) // The app.use() method is used to register middleware functions in an Express.js application. It takes a path and a middleware function as arguments.
app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))  ;
app.use(morgan("dev")) ;
// config dotenv 
dotenv.config({path:"controllers/.env"}) // important //This line is using the dotenv package to load environment variables from a configuration file
connectDb() ;
// routes
// app.get("/",(req,res)=>{
//     res.send("<h1> POS </h1>")
// })
app.use('/api/items',require('./routes/itemroutes'))
app.use('/api/users',require('./routes/userroutes'))
app.use('/api/bills',require('./routes/billroute'))
const PORT=process.env.PORT || 8080 

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`) ;
})

