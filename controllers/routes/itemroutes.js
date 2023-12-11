const express = require("express");
const { deleteitemcontroller,getitemcontroller,additemcontroller,edititemcontroller } = require("../controllers/itemcontrollers");
const router = express.Router()  ;

// get method 
router.get('/get-item',getitemcontroller) 
// post method
router.post('/add-item',additemcontroller)

// put method
router.put('/edit-item',edititemcontroller)

// delete method
router.post('/delete-item',deleteitemcontroller)

module.exports = router ;