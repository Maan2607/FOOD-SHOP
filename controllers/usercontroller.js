const userModal =  require('../models/userModel')
 const logincontroller = async(req,res)=>{
  try {
    const{userId,password} = req.body 
    const user = await userModal.findOne({userId,password,verified:true}) ;
    if(user){
      console.log("ho gaya")
      res.status(200).send(user) ;
    } else{
      console.log("nahi hua")
      // res.json({
      //   message: "Login fail",
      //   user,
      // });
      return res.status(404).json({message: "User don't exist"})
        }
  } catch (error) {
    console.log(error)
  }
};

const registercontroller = async(req,res)=>{
    console.log(req.body) ;
    
  try {
    let newUser = new userModal({...req.body,verified:true}) ;
    
    var emai = newUser.emaill ;
    const reg = await userModal.findOne({ emaill : emai});
    console.log(newUser.emaill) ;
    if(reg){
      return res.status(400).json({message: "email already exists"})
    }
    await newUser.save() ;
    res.status(201).send("New user added successfully") ;
  } catch (error) {
    res.status(400).send("error",error);
    console.log(error) ;
  }
 }
  
module.exports = {logincontroller,registercontroller}