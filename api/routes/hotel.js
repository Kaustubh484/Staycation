import express from 'express';
import {
    createHotel,
    updateHotel,
    getAllHotels,
    getHotelbyId,
    deleteHotelById,
    countHotelsByCity,
    countHotelsByType
} from '../controllers/hotel.js';
import { verifyToken, verifyAdmin } from '../utils/verify.js';
const router = express.Router();



//Create
router.post('/', verifyToken, verifyAdmin, createHotel)

//Update
router.put('/:id', verifyToken, verifyAdmin, updateHotel)

//Delete

router.delete('/:id', verifyToken, verifyAdmin, deleteHotelById)

//Get Hotel By id
router.get('/aquire/:id', getHotelbyId)

//Get all Hotels
router.get('/', getAllHotels)

router.get('/countHotelsByCity', countHotelsByCity)
router.get('/countHotelsByType', countHotelsByType)

export default router