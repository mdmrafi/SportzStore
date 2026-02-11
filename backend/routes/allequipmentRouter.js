const express = require('express')
const Equipment = require('../models/Equipment')
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const equipments = await Equipment.find({});
        res.status(200).json(equipments)
    }catch(err){
        console.error(err.message);
        res.status(401).json("Adding Equipment operation failed");
    }
})
module.exports = router;