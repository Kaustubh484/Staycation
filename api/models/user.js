import mongoose from'mongoose';

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        Required:true,
        Unique:true
    },
    email:{
        type:String,
        Required:true,
        Unique:true
    },
   
    hash: {
        type:String,
        
    },
    salt:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
//     role:{
//      type:String,
//      enum: ['admin', 'user','hotel'],
//      Required:true
//    }
});

const User=mongoose.model('user',UserSchema);
export default User