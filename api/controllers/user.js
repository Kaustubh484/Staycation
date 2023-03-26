import { errorGenerator } from '../utils/err.js';
import User from '../models/user.js';




export const createUser = async (req, res, next) => {

    let newUser = new User(
        req.body
    );
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }

}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        next(errorGenerator(500, "Could not update"));
    }

}

export const deleteUserById = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ deleted: true });
    } catch (err) {
        res.status(500).json(err);
    }

}

export const getUserbyId = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id);
        res.status(200).json(getUser);
    } catch (err) {
        res.status(500).json(err);
    }

}

export const getAllUsers = async (req, res, next) => {
    try {
        const getUsers = await User.find();
        res.status(200).json(getUsers);
    } catch (err) {
        next(errorGenerator(401, "Could not fetch Users"));
    }

}   