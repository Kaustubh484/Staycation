import mongoose from'mongoose';

const RoomSchema=new mongoose.Schema({
    name:{
        type:String,
        Required:true,
        
    },
    desc:{
        type:String,
        Required:true,
        
    },
   
    numberOfPeople: {
        type:Number,
        Required:true
        
    },
    
    roomNumbers:[{number:Number,unavailableDates:{type:[Date]}}],

},
{timestamps:true}
);

const Room=mongoose.model('room',RoomSchema);
export default Room