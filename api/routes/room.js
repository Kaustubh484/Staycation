import express from'express';
import { createRoom, updateRoom, getAllRooms, getRoombyId, deleteRoomById } from '../controllers/Room.js';
import {  verifyToken,verifyAdmin } from '../utils/verify.js';
const router = express.Router();



//Create
router.post('/:hotelId', verifyToken,verifyAdmin,createRoom)

//Update
router.put('/:id',verifyToken,verifyAdmin, updateRoom)

//Delete

router.delete('/:hotelId/:id',verifyToken,verifyAdmin, deleteRoomById)

//Get Room By id
router.get('/:id',verifyToken,verifyAdmin, getRoombyId)

//Get all Rooms
router.get('/',verifyToken,verifyAdmin, getAllRooms)


export default router