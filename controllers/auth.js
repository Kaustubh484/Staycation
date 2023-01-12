
import { errorGenerator } from '../utils/err.js';
import User from '../models/user.js';
import jwt from'jsonwebtoken';
import { generatePassword, validPassword } from'../lib/passportUtils.js';



export const register = async (req, res,next) => {
    let gen = generatePassword(req.body.password);
    let newuser = new User({
        username: req.body.username,
        hash: gen.hash,
        salt: gen.salt,
        email: req.body.email,
        
    })
    try {
        await newuser.save();
        res.status(200).json({ register: true });
    } catch (err) {
        next(err)
    }

}
    export const login = async (req, res,next) => {
        try {
            let user = await User.findOne({ username: req.body.username })

            if (!user) {
               return next(errorGenerator(404, "User not Found"))
            }
            if (validPassword(req.body.password,user.salt,user.hash)) {
                const{salt,hash,isAdmin,...other}=user._doc
                const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);
                res.cookie("auth_token",token,{httpOnly:true}).status(200).json({ login: true, user:{...other}});
              

            } else {
               return  next(errorGenerator(403, "Wrong Password"))
            }
        } catch (err) {
            next(err);
        }

    }

