 import express from'express';
import { createUser, updateUser, getAllUsers, getUserbyId, deleteUserById } from'../controllers/user.js';
import {  verifyToken,verifyAdmin } from '../utils/verify.js';
const router = express.Router();



//Create
router.post('/',createUser)

//Update
router.put('/:id', updateUser)

//Delete

router.delete('/:id', deleteUserById)

//Get User By id
router.get('/:id', getUserbyId)

//Get all Users
router.get('/', getAllUsers)

// router.get("/checkuser/:id",verifyToken,verifyRole('hotel'), (req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account")
//    })
//    router.get("/checkadmin/:id",verifyToken,verifyAdmin, (req,res,next)=>{
//     res.send("hello user, you are admin")
//    })
export default router