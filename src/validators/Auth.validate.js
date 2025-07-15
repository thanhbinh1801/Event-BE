import jwt from 'jsonwebtoken';
import { AuthFailureError } from '../handler/error.response.js';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export default class AuthValidate{
  checkAuth =  (req, res, next) => {
    const bearer = req.header['authorization'];
    if(!bearer){
      throw new AuthFailureError("authorization header is missing")
    }
    const token = bearer.split(' ')[1];
    const decode = jwt.verify(token, SECRET_KEY);
    req.user = decode;
    next();
  }

  checkAdmin = (req, res, next) => {
    if( req.user.role = 'user'){
      throw new AuthFailureError("You are not authorized to perform this action");
    }
    next();
  }
}