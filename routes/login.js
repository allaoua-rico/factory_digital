const express = require('express');
const User = require('../models/user');
const router  = express.Router();


router.post('/', (req,res) =>{
    console.log(req.body.email)
    User.findOne({email:req.body.email}).populate({path:'todos',populate:['nested_todos']}).then(doc=>{
        res.json(doc)
    })
    // res.json({msg:'hi'})
})

module.exports = router;