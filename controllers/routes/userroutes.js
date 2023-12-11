const express = require('express')
const { logincontroller,registercontroller
 } = require("../controllers/usercontroller");
const router = express.Router()

  //post method 
router.post('/login',logincontroller) 
// post method
router.post('/register',registercontroller)

module.exports = router ;