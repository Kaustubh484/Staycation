import express from "express";
import dotenv from "dotenv";
import connectDB from'./config/db.js';
import cookieParser from'cookie-parser';
const app=express();

dotenv.config()
//connect database 
connectDB();

// Init MiddleWare

app.use(express.json({ extended : false}))
app.use(cookieParser())

//Auth modules
import crypto from'crypto';
import authRoutes from'./routes/authRoutes.js';
import userRoutes from'./routes/user.js';
import hotelRoutes from'./routes/hotel.js';
// Define Routes
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/hotel",hotelRoutes);
app.use((err,req,res,next)=>{
    const errorStatus= err.status||500;
    const errorMessage= err.message||"An error occured"
    return res.status(errorStatus).json({
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})
const PORT=5000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));