import { AuthFailureError } from "../handler/error.response.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRATION_ACCESS_TOKEN = process.env.EXPIRATION_ACCESS_TOKEN;
const EXPIRATION_REFRESH_TOKEN = process.env.EXPIRATION_REFRESH_TOKEN;

export default class AuthUtil{
  static genAccessToken(user) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role}, SECRET_KEY, {expiresIn: EXPIRATION_ACCESS_TOKEN})
  }
  
  static genRefreshToken(user){
    return jwt.sign({id: user.id, email: user.email, role: user.role}, SECRET_KEY, {expiresIn: EXPIRATION_REFRESH_TOKEN})
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      throw new AuthFailureError("Invalid or expired token");
    }
  }
}