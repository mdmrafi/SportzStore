const express = require('express')
const Equipment = require('../models/Equipment')
const router = express.Router();

router.get('/:id',async(req,res)=>{
    try{
        console.log("Full URL:", req.originalUrl);
        console.log("Params:", req.params);
        const uid = req.params.id;
        console.log("Fetching equipment for userId:", uid);
        const equipments = await Equipment.find({userId:uid});
        console.log("Found equipments:", equipments.length);
        res.status(200).json(equipments)
    }catch(err){
        console.error(err.message);
        res.status(401).json("Adding Equipment operation failed");
    }
})
module.exports = router;