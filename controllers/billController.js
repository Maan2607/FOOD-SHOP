const billsModel =  require('../models/billModel')

const addbillscontroller = async(req,res)=>{
  try {
    const newbill= new billsModel(req.body) ;
    await newbill.save() ;
    res.status(201).send("Bill created successfully") ;
  } catch (error) {
    res.send('something went wrong');
    console.log(error) ;
  }
 };

 //get bills data
 const getBillscontroller = async(req,res)=>{
  try {
    const bills = await billsModel.find() ;
    res.send(bills) ;
  } catch (error) {
    console.log(error)
  }
};

   
module.exports = {addbillscontroller, getBillscontroller}