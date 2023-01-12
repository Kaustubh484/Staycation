const mongoose= require('mongoose');
const HotelSchema= new mongoose.Schema({
    name:{
     type:String,
     Required:true
    },
    type:{
        type:String,
        Required:true
    },
    address:{
        type:String,
        Required:true
    },
    city:{
    type:String,
    Required:true
    },
    distance:{
        type:String,
        required :true
    },
    photos:{
        type:[String]
    },
    rating:{
        type:Number
    },
    rooms:{
        type:[String]
    },
    cheapestPrice:{
        type:Number
    }
})
module.exports=Hotel=mongoose.model('hotel',HotelSchema);