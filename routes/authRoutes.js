const express = require('express');
const router= express.Router();
const passport = require(`passport`);
const generatePassword= require(`../lib/passportUtils`).generatePassword;
const User = require(`../models/user`);



router.get('/users/:id', async(req, res,next) => {
    if (req.isAuthenticated()) {
        try{
       let user= await User.findById(req.params.id);
        res.json({user:user});
        next();
        }catch(err){
            console.log(err);
        }
    }else{
        res.json({user:false});
    }
})
router.post('/register', async(req, res) => {

    let gen= generatePassword(req.body.password);
    let newuser = new User({
        username: req.body.username,
        hash: gen.hash,
        salt:gen.salt,
        email: req.body.email
    })
     try{
      const user=await newuser.save();
      res.json({register:true});
     }catch(err){
         console.log(err);
     }

})
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) res.json({login:"err"});
        req.logIn(user,(err)=>{
            if(err) return res.json({login:false});
            return res.json({login:true,userid:user._id});
        })
        
    })(req,res,next);
    
})


module.exports=router;