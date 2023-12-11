const itemModel =  require('../models/itemModel')

 const getitemcontroller = async(req,res)=>{
  try {
    const items = await itemModel.find() ;
    res.status(200).send(items) ;
  } catch (error) {
    console.log(error)
  }
};

const additemcontroller = async(req,res)=>{
  try {
    const newitem = new itemModel(req.body) ;
    await newitem.save() ;
    res.status(201).send("Items created successfully") ;
  } catch (error) {
    res.status(400).send("error",error);
    console.log(error) ;
  }
 };
  const edititemcontroller = async(req,res)=>{
   try{
    const {itemId} = req.body ;
     await itemModel.findOneAndUpdate({_id:req.body.itemId},req.body,{
      new:true,
     })  ;
      res.status(201).send("Item Updated!") ;
    }
   catch(error){
    res.status(400).send(error)
    console.log(error)
   }

  };

  const deleteitemcontroller = async(req,res)=>{
    try{
      const {itemId} = req.body ;
      await itemModel.findOneAndDelete({_id:itemId})  
       res.status(200).send("Item Deleteed!") ;
     }
    catch(error){
     res.status(400).send(error)
     console.log(error)
    }
 
   };

   
module.exports = {getitemcontroller,additemcontroller,edititemcontroller,deleteitemcontroller}