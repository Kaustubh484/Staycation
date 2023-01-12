const express = require('express');
const router= express.Router();
const Hotel= require(`../models/hotel`);

router.post('/hotel',async(req,res,next)=>{
    let newHotel= new Hotel(req.body);
try{
    const savedhotel = await newHotel.save();
    res.status(200).json(savedhotel);
}catch(err){
  res.status(500).json(err);
}

})