const express = require('express')
const Equipment = require('../models/Equipment')
const router = express.Router();

router.post('/',async(req,res)=>{
    try{
        const equipment = new Equipment(req.body);
        await equipment.save();
        res.status(200).json("New equipment added successfully")
    }catch(err){
        console.error(err.message);
        res.status(400).json({ message: "Adding Equipment operation failed", error: err.message });
    }
})
module.exports= router;