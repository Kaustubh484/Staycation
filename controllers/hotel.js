import { errorGenerator } from '../utils/err.js';
import Hotel from '../models/hotel.js';




export const createHotel = async (req, res, next) => {

    let newHotel = new Hotel(
        req.body
    );
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        res.status(500).json(err);
    }

}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(errorGenerator(500, "Could not update"));
    }

}

export const deleteHotelById = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({ deleted: true });
    } catch (err) {
        res.status(500).json(err);
    }

}

export const getHotelbyId = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id);
        res.status(200).json(getHotel);
    } catch (err) {
        res.status(500).json(err);
    }

}

export const getAllHotels = async (req, res, next) => {
    try {
        const getHotels = await Hotel.find();
        res.status(200).json(getHotels);
    } catch (err) {
        next(errorGenerator(401, "Could not fetch hotels"));
    }

}   