const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        Required:true
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
   
});

module.exports=User=mongoose.model('user',UserSchema);