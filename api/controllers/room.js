import { errorGenerator } from '../utils/err.js';
import Room from '../models/room.js';
import Hotel from '../models/hotel.js';



export const createRoom = async (req, res, next) => {
    const hotelId= req.params.hotelId
    let newRoom = new Room(
        req.body
    );
    try {
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
        }
        catch(err){
          next(err)

        }
        res.status(200).json(savedRoom);
    } catch (err) {
        res.status(500).json(err);
    }

}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(errorGenerator(500, "Could not update"));
    }

}

export const deleteRoomById = async (req, res, next) => {
    try {
         const deletedRoom=await Room.findByIdAndDelete(req.params.id);
         try{
            await Hotel.findByIdAndUpdate(req.params.hotelId,{$pull:{rooms:deletedRoom._id}})
        }
        catch(err){
          next(err)

        }
        res.status(200).json({ deleted: true });
    } catch (err) {
        res.status(500).json(err);
    }

}

export const getRoombyId = async (req, res, next) => {
    try {
        const getRoom = await Room.findById(req.params.id);
        res.status(200).json(getRoom);
    } catch (err) {
        res.status(500).json(err);
    }

}

export const getAllRooms = async (req, res, next) => {
    try {
        const getRooms = await Room.find();
        res.status(200).json(getRooms);
    } catch (err) {
        next(errorGenerator(401, "Could not fetch Rooms"));
    }

}   