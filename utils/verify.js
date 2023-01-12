import jwt from 'jsonwebtoken';
import { errorGenerator } from '../utils/err.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return next(errorGenerator(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(errorGenerator(403, "Token is not valid!"));
    req.user = user;
    next()
  });
};

export const verifyUser = (req, res, next) => {

  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return next(errorGenerator(403, "You are not authorized!"));
  }


};

export const verifyAdmin=(req, res, next) => {

  if ( req.user.isAdmin) {
    next();
  } else {
    return next(errorGenerator(403, "You are not authorized!"));
  }


};

// export const verifyRole = (role) => {
  
//    return(req,res,next)=>{
//     console.log(req.user)
//     if (req.user.role === role || req.user.role=='admin') {
//       next();
//     } else {
//       return next(errorGenerator(403, "You are not authorized!"));
//     }
  
//    }

// };

