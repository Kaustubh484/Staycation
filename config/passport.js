const passport=require(`passport`);
const LocalStrategy= require(`passport-local`).Strategy;
const User = require(`../models/user`);
const validPassword= require(`../lib/passportUtils`).validPassword;


const verifycallback=(username,password,done)=>{
    
    User.findOne({username:username})
    .then((user)=>{
        if(!user) return done(null,false);
        
        if(validPassword(password,user.salt,user.hash)){
            return done(null,user);
        }else{
            return done(null,false);
        }
    
    })
}
const strategy= new LocalStrategy(verifycallback);
passport.use(strategy);
passport.serializeUser((user,done)=>{
    return done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>{
        return done(null,user);
    })
})
module.exports=passport;