import express from'express';
import { createHotel, updateHotel, getAllHotels, getHotelbyId, deleteHotelById } from '../controllers/hotel.js';
import {  verifyToken,verifyAdmin } from '../utils/verify.js';
const router = express.Router();



//Create
router.post('/', verifyToken,verifyAdmin,createHotel)

//Update
router.put('/:id',verifyToken,verifyAdmin, updateHotel)

//Delete

router.delete('/:id',verifyToken,verifyAdmin, deleteHotelById)

//Get Hotel By id
router.get('/:id',verifyToken,verifyAdmin, getHotelbyId)

//Get all Hotels
router.get('/',verifyToken,verifyAdmin, getAllHotels)


export default router