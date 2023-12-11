const express = require("express");
const {addbillscontroller,getBillscontroller} = require("../controllers/billController");
const router = express.Router()  ;



// post method
router.post('/add-bills',addbillscontroller)
router.get('/get-bills',getBillscontroller)

module.exports = router ;