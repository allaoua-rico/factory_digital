const express = require('express');
const User = require('../models/user');
const router  = express.Router();


router.post('/', (req,res) =>{
    console.log(req.body.username)
    User.find({email:req.body.username},{todos:1}).populate({path:'todos',populate:['nested_todos']}).then(doc=>{
        res.json(doc)
    })
    // res.json({msg:'hi'})
})

module.exports = router;