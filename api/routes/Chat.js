const express = require('express');
const router = express.Router();
const ResponseModel = require('../models/ResponseModel')

router.get('/',(req,res)=>{
    res.json(ResponseModel.ok());
})

router.get('/route',(req,res)=>{
    res.redirect("http://localhost:3000/chat");
})

module.exports = router;