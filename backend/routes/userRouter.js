const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/',async(req,res)=>{
    try{
        const {uid,email} = req.body;
        const existingUser = await User.findOne({uid});
        if(existingUser){
            console.log("user already exists")
            return res.status(200).json(existingUser)
        }
        const user = new User({uid,email});
        await user.save();
        res.status(200).json(user);
    }catch(err){
        console.error(err.message);
    }
})
module.exports = router;