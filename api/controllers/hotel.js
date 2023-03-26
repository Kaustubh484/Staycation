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
    const { min, max, ...other } = req.query
    try {
        const getHotels = await Hotel.find({
            ...other,
            cheapestPrice: { $gte: min|1, $lte: max||999 },
        }).limit(parseInt(req.query.limit));
        res.status(200).json(getHotels);
    } catch (err) {
        next(errorGenerator(401, "Could not fetch hotels"));
    }

}

export const countHotelsByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");

    try {
        const count = await Promise.all(cities.map((city) => {

            return Hotel.countDocuments({ city: city })
        }))
        res.json(count)
    } catch (err) {
        next(err)
    }
}


export const countHotelsByType = async (req, res, next) => {
    try {
        const hotels = await Hotel.countDocuments({ type: "hotel" })
        const apartments = await Hotel.countDocuments({ type: "apartment" })
        const resorts = await Hotel.countDocuments({ type: "resort" })
        const villas = await Hotel.countDocuments({ type: "villa" })
        const cabins = await Hotel.countDocuments({ type: "cabin" })
        res.json([
            { type: 'hotel', count: hotels },
            { type: 'apartment', count: apartments },
            { type: 'resort', count: resorts },
            { type: 'villa', count: villas },
            { type: 'cabin', count: cabins },
        ])
    }
    catch (err) {
        next(err)
    }
}   